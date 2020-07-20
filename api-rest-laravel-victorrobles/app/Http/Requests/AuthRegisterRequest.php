<?php

namespace App\Http\Requests;

use Dotenv\Validator;
use http\Env\Response;
use Illuminate\Auth\Events\Validated;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class AuthRegisterRequest extends FormRequest
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
            "name" => ["required", "unique:users"],
            "email" => ["required", "email", "unique:users"],
            "password" => ["required"]
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
            "name" => "Username is required and has to be written by only letters",
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
                    'message' => 'Register not successful',
                    'status' => 0
                ],
                422,
                ["Content-type" => "application/json"]
            )
        );
    }
}
