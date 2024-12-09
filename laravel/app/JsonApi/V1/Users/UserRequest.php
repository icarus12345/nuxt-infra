<?php

namespace App\JsonApi\V1\Users;

use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

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
            'name' => ['string'],
            'email' => ['email'],
            'active' => JsonApiRule::boolean(),
            'roles' => JsonApiRule::toMany(),
            'deletedAt' => ['nullable', JsonApiRule::dateTime()],
        ];
    }

}
