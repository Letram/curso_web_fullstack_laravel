<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthLoginRequest extends FormRequest
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
            "email" => ["required", "email"],
            "password" => ["required"],
            "wantsToken" => "",
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
                    'message' => 'Login not successful',
                    'status' => 0
                ],
                422,
                ["Content-type" => "application/json"]
            )
        );
    }
}
