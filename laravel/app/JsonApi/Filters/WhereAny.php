<?php
namespace App\JsonApi\Filters;

use Illuminate\Support\Facades\Log;
use LaravelJsonApi\Eloquent\Contracts\Filter;
use LaravelJsonApi\Eloquent\Filters\Concerns\IsSingular;
use LaravelJsonApi\Core\Support\Str;
use Illuminate\Support\Traits\Conditionable;
use LaravelJsonApi\Eloquent\Filters\Concerns\HasColumns;
use LaravelJsonApi\Eloquent\Filters\Concerns\DeserializesValue;
use LaravelJsonApi\Eloquent\Filters\Concerns\HasOperator;

class WhereAny implements Filter
{
    use DeserializesValue;
    use HasColumns;
    use HasOperator;
    use IsSingular;
    use Conditionable;

    /**
     * @var string
     */
    private string $name;

    /**
     * Create a new filter.
     *
     * @param string $name
     * @param array<string>|null $columns
     * @return static
     */
    public static function make(string $name, array $columns = null): static
    {
        return new static($name, $columns);
    }

    /**
     * WhereAny constructor.
     *
     * @param string $name
     * @param array<string>|null $columns
    */
    public function __construct(string $name, array $columns = null)
    {
        $this->name = $name;
        $this->columns = $columns ?? [];
        $this->operator = 'like';
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
      $whereValue = "%" . $this->deserialize($value) . "%";
      return $query->whereAll(
          $this->qualifiedColumns($query->getModel()),
          $this->operator(),
          $whereValue
      );
    }
}
