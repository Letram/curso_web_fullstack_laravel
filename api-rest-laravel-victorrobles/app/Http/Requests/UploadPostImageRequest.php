<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UploadPostImageRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "image_file" => ["image", "mimes:jpeg,png,jpg", "max:2048"]
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
            "image_file.mimes" => "Format not supported (jpeg, jpg or png)",
            "image_file.max" => "Max file size is 2mb",
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
