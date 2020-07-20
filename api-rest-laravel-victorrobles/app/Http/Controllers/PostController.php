<?php

namespace App\Http\Controllers;

use App\Category;
use App\Helpers\JwtAuth;
use App\Http\Middleware\CustomAuthMiddleware;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Requests\UploadPostImageRequest;
use App\Post;
use App\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Psy\Util\Json;
use function GuzzleHttp\Psr7\mimetype_from_extension;

class PostController extends Controller
{

    public function __construct()
    {
        $this->middleware("web");
        $this->middleware(CustomAuthMiddleware::class)->except([
            "index",
            "show",
            "getImage",
            "getPostsByCategory",
            "getPostsByUser",
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //load method inflates the property passed. In this case, as post has a category_id related to it,
        //we can inflate that property via load("category")
        return new JsonResponse([
            "code" => 200,
            "status" => 1,
            "posts" => Post::all()->load("category")
        ], 200, ["content-type" => "application/json"]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\CreatePostRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreatePostRequest $request)
    {
        $postData = $request->validated();

        $token = $request->header("Authorization");
        $decodedUser = $this->getDecodedUser($token);

        $postData["user_id"] = $decodedUser->sub;
        $postData["category_id"] = intval($postData["category_id"]);
        $newPost = (new \App\Post)->create($postData);

        return new JsonResponse([
            "code" => 200,
            "status" => 1,
            "post" => $newPost->load("category")
        ], 200, ["content-type" => "application/json"]);
    }

    public function uploadImage(UploadPostImageRequest $request, Post $post){
        //1.- Get authorization token
        $token = $request->header("Authorization");
        $decodedToken = $this->getDecodedUser($token);
        //2.- Check if the user that is being updated is the one logged in
        if ($post->user_id == $decodedToken->sub) {
            $postData = $request->validated();
            if ($request->hasFile("image_file")) {
                $extension = $request->image_file->extension();
                $postData["image_url"] = $request->image_file->storeAs('/public', "post-$post->id-image".".".$extension);
                unset($postData["image_file"]);
            }
            $post->update($postData);

            return new JsonResponse([
                "code" => 200,
                "status" => 1,
                "updated_post" => $post
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
     * @param \App\Post $post
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function getImage(Request $request, Post $post){
        $imageFile = Storage::get($post->image_url);
        $ext = pathinfo($imageFile, PATHINFO_EXTENSION);
        return response($imageFile,200, ["Content-Type" => mimetype_from_extension($ext)]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Post $post)
    {
        return new JsonResponse([
            "code" => 200,
            "status" => 1,
            "post" => $post->load("category")
        ], 200, ["content-type" => "application/json"]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdatePostRequest $request
     * @param \App\Post $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $postData = $request->validated();

        //a post can only be updated by its creator. decodedUser->sub == post->user_id
        $token = $request->header("Authorization");
        if($this->getDecodedUser($token)->sub == $post->user_id){
            $post->updateOrCreate($postData);
            return new JsonResponse([
                "code" => 200,
                "status" => 1,
                "post" => $post->load("category")
            ], 200, ["content-type" => "application/json"]);
        }else{
            throw new HttpResponseException(
                \response()->json(
                    [
                        'code' => '402',
                        'message' => "You can only update your own posts.",
                        'errors' => 'Unauthorized action',
                        'status' => 0
                    ],
                    422,
                    ["Content-type" => "application/json"]
                )
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, Post $post)
    {
        $token = $request->header("Authorization");

        if($this->getDecodedUser($token)->sub == $post->user_id){
            $post->delete();
            return new JsonResponse([
                "code" => 200,
                "status" => 1,
                "post" => $post
            ], 200, ["content-type" => "application/json"]);
        }else{
            throw new HttpResponseException(
                \response()->json(
                    [
                        'code' => '402',
                        'message' => "You can only delete your own posts.",
                        'errors' => 'Unauthorized action',
                        'status' => 0
                    ],
                    422,
                    ["Content-type" => "application/json"]
                )
            );
        }
    }

    /**
     * @param \App\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPostsByCategory(Category $category){
        return new JsonResponse([
            "code" => 200,
            "status" => 1,
            "posts" => (new \App\Post)->where("category_id", "=", $category->id)->get()
        ], 200, ["content-type" => "application/json"]);
    }

    /**
     * @param \App\User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPostsByUser(User $user){
        return new JsonResponse([
            "code" => 200,
            "status" => 1,
            "posts" => (new \App\Post)->where("user_id", "=", $user->id)->get()
        ], 200, ["content-type" => "application/json"]);
    }

    /**
     * @param string $token
     * @return bool|object
     */
    private function getDecodedUser(string $token){
        $jwtAuth = new JwtAuth();
        return $jwtAuth->authenticateToken($token, true);
    }
}
