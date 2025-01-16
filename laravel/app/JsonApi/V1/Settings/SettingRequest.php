<?php

namespace App\JsonApi\V1\Settings;

use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class SettingRequest extends ResourceRequest
{

    /**
     * Get the validation rules for the resource.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'string'],
            'name' => ['required', 'string'],
            'data' => ['required', JsonApiRule::obj()],
        ];
    }

}
