<?php

namespace App\Http\Controllers;

use App\Helpers\JwtAuth;
use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthRegisterRequest;
use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Handle register request.
     * Keep in mind that a custom FormRequest was created for this purpose so some of its methods were overridden.
     *
     * @param \App\Http\Requests\AuthRegisterRequest $request
     * @return array|string
     */
    public function register(AuthRegisterRequest $request){

        //get user data & validate inputs
        $userData = $request->validated();

        //If User data is correct we can just create the user and return to user.index
        $user = User::create([
            "name"=>$userData["name"],
            "email"=>$userData["email"],
            "password"=>hash("sha256", $userData["password"]),
        ]);

        return response()->json(
            [
                "status" => 1,
                "code" => 200,
                "user" => $user
            ],
            200,
            ["Content-Type" => "Application/json"]
        );    }

    /**
     * Method used to login. It can return a token in a string or an object fo the user
     *
     * @param \App\Http\Requests\AuthLoginRequest $request
     * @return object|string
     */
    public function login(AuthLoginRequest $request){
        //Getting the data from the user

        $wantsToken = null;
        $data = $request->validated();
        if(!empty($data["wantsToken"])){
            $wantsToken = true;
        }

        $auth = new JwtAuth();

        return response()->json([
          "status" => 1,
          "code" => 200,
          "token" => $auth->signup($data["email"], hash("sha256", $data["password"]),  true),
          "user" => $auth->signup($data["email"], hash("sha256", $data["password"]),  null)
        ],
            200,
            ["Content-Type" => "Application/json"]
        );
    }
}
