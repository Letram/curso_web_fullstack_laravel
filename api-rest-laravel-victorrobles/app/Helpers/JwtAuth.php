<?php

namespace App\Helpers;

use App\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Exceptions\HttpResponseException;

class JwtAuth{

    const  KEY = "SecretKey001";

    /**
     * Method used for login a user into the system.
     *
     * @param string $email of the user that wants to be authenticated
     * @param string $password of the user that wants to be authenticated
     * @param bool $wantsToken if the user wants the authentication information in a token or in raw data
     * @return object|string
     */
    public function signup($email, $password, $wantsToken = null){
        //1.- check if user exists
        $user = User::where([
            "email" => $email,
            "password" => $password
        ])->first();

        //2.- if the user exists, then we can authenticate it generating a JWT token.
        if(is_object($user)){
            /**
             * token content:
             *
             * sub = user id,
             * email = user email
             * name = user name
             * iat = creation date
             * exp = expiration date (the token will last 7 days -> in seconds (7 days * 24 hours per day * 3600 seconds per hour))
             */
            $token = array(
                "sub" => $user->id,
                "email" => $user->email,
                "name" => $user->name,
                "image_url" => $user->image_url,
                "iat" => time(),
                "exp" => time() + 7*24*3600
            );
            $jwtToken = JWT::encode($token, self::KEY, "HS256");
            if ($wantsToken){
                return $jwtToken;
            }
            else {
                return JWT::decode($jwtToken, self::KEY, ["HS256"]);
            }
        }else{
            throw new HttpResponseException(
                \response()->json(
                    [
                        'code' => '401',
                        'errors' => 'Username or password incorrect',
                        'message' => 'Login not successful',
                        'status' => 0
                    ],
                    401,
                    ["Content-type" => "application/json"]
                )
            );
        }
    }

    /**
     * @param string $jwt jwt token to be decoded
     * @param bool $getUser if what we want is the fact that the token is valid or the user related to the token (which is valid as well)
     * @return bool|object true/false if the call just want the token to be authentic or not or the user object if needed
     */
    public function authenticateToken($jwt, $getUser = false){

        try{
            $jwt = str_replace('"', '', $jwt);
            $decoded = JWT::decode($jwt, self::KEY, ["HS256"]);
            if(!empty($decoded) && is_object($decoded) && isset($decoded->sub)){
                if ($getUser){
                    return $decoded;
                }
                return true;
            }else{
                return false;
            }
        }catch (\UnexpectedValueException $exception){
            return false;
        }catch (\DomainException $exception){
            return false;
        }
    }
}
