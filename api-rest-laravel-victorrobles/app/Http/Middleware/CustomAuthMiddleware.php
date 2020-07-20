<?php

namespace App\Http\Middleware;

use App\Helpers\JwtAuth;
use Closure;
use Illuminate\Http\Exceptions\HttpResponseException;

class CustomAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     * @throws \HttpResponseException if the user is not authentified
     */
    public function handle($request, Closure $next)
    {
        //Check if the user is identified
        $token = $request->header("Authorization");
        $jwtHelper = new JwtAuth();
        $decodedToken = $jwtHelper->authenticateToken($token);
        if ($decodedToken) return $next($request);
        else{
            throw new HttpResponseException(
                \response()->json(
                    [
                        'code' => '401',
                        'errors' => 'Cannot do that',
                        'message' => 'User not authenticated',
                        'status' => 0
                    ],
                    401,
                    ["Content-type" => "application/json"]
                )
            );
        }
    }
}
