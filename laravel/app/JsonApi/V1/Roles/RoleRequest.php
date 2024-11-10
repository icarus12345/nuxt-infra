<?php

namespace App\JsonApi\V1\Roles;

use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;
// use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
class RoleRequest extends ResourceRequest
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
            'guardName' => ['required', 'string'],
            'permissions' => JsonApiRule::toMany(),
        ];
    }

}