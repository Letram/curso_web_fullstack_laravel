<?php

namespace App\Http\Requests;

use App\Helpers\JwtAuth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name" => ["required", Rule::unique("users", "name")->ignore($this->route('user')->id)],
            "email" => ["required", "email", Rule::unique("users", "email")->ignore($this->route('user')->id)],
            "password" => [""],
            "description" => [""],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            "name.required" => "Username is required",
            "email.required" => "Email is required",
            "email.unique" => "Email is already in use"
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @return void
    */
    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator) {
        // Put whatever response you want here.
        throw new HttpResponseException(
            \response()->json(
                [
                    'code' => '422',
                    'errors' => $validator->errors(),
                    'message' => 'Update not successful',
                    'status' => 0
                ],
                422,
                ["Content-type" => "application/json"]
            )
        );
    }
}
