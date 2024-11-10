<?php

namespace App\JsonApi\V1\Users;

use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;
// use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
class UserRequest extends ResourceRequest
{

    /**
     * Get the validation rules for the resource.
     *
     * @return array
     */
    public function rules(): array
    {
        // $model = $this->model();

        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'active' => JsonApiRule::boolean(),
            'roles' => JsonApiRule::toMany(),
            'deletedAt' => ['nullable', JsonApiRule::dateTime()],
        ];
    }

}
