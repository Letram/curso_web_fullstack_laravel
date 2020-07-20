<?php

namespace App\Http\Controllers;

use App\Helpers\JwtAuth;
use App\Http\Requests\UpdateImageUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Testing\MimeType;
use Illuminate\Support\Facades\Storage;
use App\Http\Middleware\CustomAuthMiddleware;

use Illuminate\Filesystem\Filesystem;
use function GuzzleHttp\Psr7\mimetype_from_extension;

class UserController extends Controller
{
    /**
     * UserController constructor.
     *
     * we can set here the middleware to be used
     */
    public function __construct()
    {
        $this->middleware('web');
        $this->middleware(CustomAuthMiddleware::class)->only(['update', 'uploadImage', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(User::all()->pluck("name"));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user)
    {
        return new JsonResponse([
            "code" => 200,
            "status" => 1,
            "user" => $user
        ], 200, ["Content-type" => "Application/json"]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //1.- Get authorization token
        $token = $request->header("Authorization");
        $jwtAuth = new JwtAuth();
        $decodedToken = $jwtAuth->authenticateToken($token, true);
        if ($user->id == $decodedToken->sub){
            $userData = $request->validated();
            /*
             * In case that we wanted the user to be able to change its password here,
             * uncomment this and replace the one below
             *
             */
            if(isset($userData["password"])){
                $userData["password"] = hash("sha256", $userData["password"]);
            }else{
                unset($userData["password"]);
            }
            $user->update($userData);
            return new JsonResponse([
                "status" => 1,
                "updated_user" => $user,
                "code" => 200
            ], 200, ["Content-Type" => "Application/json"]);
        }else{
            throw new HttpResponseException(
                \response()->json(
                    [
                        'code' => '401',
                        'errors' => 'Cannot do that',
                        'message' => 'You cannot update a user that is not yourself',
                        'status' => 0
                    ],
                    401,
                    ["Content-type" => "application/json"]
                )
            );
        }
    }

    /**
     * Update the specified user avatar in storage
     *
     * @param \App\Http\Requests\UpdateImageUserRequest $request
     * @param \App\User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImage(UpdateImageUserRequest $request, User $user)
    {
        //1.- Get authorization token
        $token = $request->header("Authorization");
        $jwtAuth = new JwtAuth();
        $decodedToken = $jwtAuth->authenticateToken($token, true);
        //2.- Check if the user that is being updated is the one logged in
        if ($user->id == $decodedToken->sub) {
            $userData = $request->validated();
            if ($request->hasFile("image_file")) {
                $extension = $request->image_file->extension();
                $userData["image_url"] = $request->image_file->storeAs('/public', "$user->id-avatar".".".$extension);
                unset($userData["image_file"]);
            }
            $user->update($userData);

            return new JsonResponse([
                "code" => 200,
                "status" => 1,
                "updated_user" => $user
            ], 200, ["Content-Type" => "Application/json"]);
        }else{
            throw new HttpResponseException(
                response()->json([
                    "code" => 402,
                    "status" => 0,
                    "message" => "You cant upload an avatar for another user."
                ])
            );
        }
    }

    /**
     * Get the avatar of the user
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\User $user
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function getImage(Request $request, User $user){
        $imageFile = Storage::get($user->image_url);
        $ext = pathinfo($imageFile, PATHINFO_EXTENSION);
        return response($imageFile,200, ["Content-Type" => mimetype_from_extension($ext)]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
