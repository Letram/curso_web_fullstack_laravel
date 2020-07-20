<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePostRequest extends FormRequest
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
            "title" => ["required"],
            "content" => ["required"],
            "image_url" => [""],
            "image_file" => ["mimes:jpeg,png,jpg", "max:2048"],
            "category_id" => [""],
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
                    'message' => 'Cannot update this post',
                    'status' => 0
                ],
                422,
                ["Content-type" => "application/json"]
            )
        );
    }
}
