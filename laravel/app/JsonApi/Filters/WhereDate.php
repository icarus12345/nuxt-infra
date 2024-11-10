<?php
namespace App\JsonApi\Filters;

use Illuminate\Support\Facades\Log;
use LaravelJsonApi\Eloquent\Contracts\Filter;
use LaravelJsonApi\Eloquent\Filters\Concerns\DeserializesValue;
use LaravelJsonApi\Eloquent\Filters\Concerns\IsSingular;
use LaravelJsonApi\Eloquent\Filters\Concerns\HasColumn;
use LaravelJsonApi\Eloquent\Filters\Concerns\HasOperator;
use LaravelJsonApi\Core\Support\Str;

class WhereDate implements Filter
{
    use DeserializesValue;
    use HasColumn;
    use HasOperator;
    use IsSingular;

    /**
     * @var string
     */
    private string $name;

    /**
     * @var string
     */
    private string $column;

    /**
     * Create a new filter.
     *
     * @param string $name
     * @param string|null $column
     * @return static
     */

    private string $operatorType;
    private string $secondOperatorType;
    private string $conditionOperator;
    private string $secondValue;
    public static function make(string $name, string $column = null): self
    {
        return new static($name, $column);
    }

    /**
     * CustomFilter constructor.
     *
     * @param string $name
     * @param string|null $column
     */
    public function __construct(string $name, string $column = null)
    {
        $this->name = $name;
        $this->column = $column ?: Str::underscore($name);
        $this->operator = '=';
        $this->operatorType = request("operator.$name", "");
        $this->conditionOperator = request("conditionOperator", "");

        $this->secondOperatorType = request("operator2.$name", "");
        $this->secondValue = request("filter2.$name", "");
    }

    /**
     * @inheritDoc
     */
    public function key(): string
    {
        return $this->name;
    }

    /**
     * @inheritDoc
     */
    public function apply($query, $value)
    {

        return $query->Where(function($query) use ($value) {
            $this->addCondition($query, $this->operatorType, $value);
            if ($this->conditionOperator) {
                $this->addCondition($query, $this->secondOperatorType, $this->secondValue, $this->conditionOperator);
            }
        });
    }

    private function addCondition($query, $operatorType, $value, $conditionOperator = "AND") {
        $method = [
            'AND' => 'where',
            'OR' => 'orWhere',
        ][$conditionOperator];
        $operator = $this->operator();
        $whereValue = $this->deserialize($value);
        switch ($operatorType) {
            case 'notEquals':
                $operator = '!=';
                break;
            case 'greaterThan':
                $operator = '>=';
                break;
            case 'lessThan':
                $operator = '<=';
                break;
            case 'inRange':
                return $query
                ->{"{$method}Date"}($query->getModel()->qualifyColumn($this->column()), '>=', $value)
                ->{"{$method}Date"}($query->getModel()->qualifyColumn($this->column()), '<=', $this->secondValue);
            case 'blank':
                return $query->{"{$method}Null"}($query->getModel()->qualifyColumn($this->column()));
            case 'notBlank':
                return $query->{"{$method}NotNull"}($query->getModel()->qualifyColumn($this->column()));
            default:
                $operator = '=';
        }
        return $query->{"{$method}Date"}(
            $query->getModel()->qualifyColumn($this->column()),
            $operator,
            $whereValue
        );
    }
}