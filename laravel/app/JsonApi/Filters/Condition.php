<?php

namespace App\JsonApi\Filters;

use Illuminate\Support\Facades\Log;
use LaravelJsonApi\Eloquent\Filters\Concerns\DeserializesValue;
use LaravelJsonApi\Eloquent\Filters\Concerns\HasColumn;
use LaravelJsonApi\Eloquent\Filters\Concerns\HasOperator;

trait Condition
{
  use DeserializesValue;
  use HasColumn;
  use HasOperator;
  function addCondition($query, $condition, $isDate = false)
  {
    $column = $query->getModel()->qualifyColumn($this->column());
    $AND_OR = 'AND';
    $operatorType = $condition['operator'] ?? 'equals';
    $value = $condition['value'];
    $method = [
      'AND' => 'where',
      'OR' => 'orWhere',
    ][$AND_OR];
    $whereValue = $this->deserialize($value);
    if (is_array($value)) {
      if ($operatorType === 'equals') {
        $operatorType = 'in';
      }
      if ($operatorType === 'notEquals') {
        $operatorType = 'notIn';
      }
    }
    if (in_array($operatorType, ['in', 'notIn']) && !is_array($value)) {
      $value =  explode(',', $value);
    }
    switch ($operatorType) {
      case 'notEquals':
        $operator = '!=';
        break;
      case 'greaterThan':
        $operator = '>';
        break;
      case 'greaterThanOrEqual':
        $operator = '>=';
        break;
      case 'lessThan':
        $operator = '<';
        break;
      case 'lessThanOrEqual':
        $operator = '<=';
        break;
      case 'contains':
        $whereValue = "%" . $whereValue . "%";
        $operator = 'like';
        break;
      case 'notContains':
        $whereValue = "%" . $whereValue . "%";
        $operator = 'not like';
        break;
      case 'startsWith':
        $whereValue = $whereValue . "%";
        $operator = 'like';
        break;
      case 'endsWith':
        $whereValue = "%" . $whereValue;
        $operator = 'like';
        break;
      case 'inRange':
        if ($isDate) {
          return $query
            ->{"{$method}Date"}($query->getModel()->qualifyColumn($this->column()), '>=', $value[0])
            ->{"{$method}Date"}($query->getModel()->qualifyColumn($this->column()), '<=', $value[1]);
        }
        return $query->{"{$method}Between"}($column, $value);
      case 'blank':
        return $query->{"{$method}Null"}($column);
      case 'notBlank':
        return $query->{"{$method}NotNull"}($column);
      case 'in':
        return $query->{"{$method}In"}($column, $value);
      case 'notIn':
        return $query->{"{$method}NotIn"}($column, $value);
      default:
        $operator = '=';
    }
    if ($isDate) {
      $method .= 'Date';
    }
    return $query->{$method}(
      $column,
      $operator,
      $whereValue
    );
  }
}
