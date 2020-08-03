<?php

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::post('/auth/register', 'AuthController@register')->name("auth.register");
Route::post('/auth/login', 'AuthController@login')->name("auth.login");

//error 404 custom handling. Instead of redirecting to a page it returns a JSON error response.
Route::model('user', \App\User::class, function (){
    throw new HttpResponseException(
        \response()->json(
            [
                'code' => '404',
                'errors' => 'User not found',
                'status' => 0
            ],
            422,
            ["Content-type" => "application/json"]
        )
    );
});
Route::model('category', \App\Category::class, function (){
    throw new HttpResponseException(
        \response()->json(
            [
                'code' => '404',
                'errors' => 'Category not found',
                'status' => 0
            ],
            422,
            ["Content-type" => "application/json"]
        )
    );
});
Route::model('post', \App\Post::class, function (){
    throw new HttpResponseException(
        \response()->json(
            [
                'code' => '404',
                'errors' => 'Post not found',
                'status' => 0
            ],
            422,
            ["Content-type" => "application/json"]
        )
    );
});

Route::post('api/users/{user}/image', "UserController@uploadImage")->name("users.uploadImage");
Route::get('api/users/{user}/image', "UserController@getImage")->name("users.getImage");

Route::get('api/categories/{category}/posts', "CategoryController@GetPosts")->name("category.posts");

Route::get('api/posts/random', "PostController@getRandom")->name("posts.random");
Route::get('api/posts/category/{category}', "PostController@getPostsByCategory")->name("posts.byCategory");
Route::get('api/posts/user/{user}', "PostController@getPostsByUser")->name("posts.byUser");
Route::post('api/posts/{post}/image', "PostController@uploadImage")->name("posts.uploadImage");
Route::post('api/posts/upload', "PostController@uploadImage2")->name("posts.uploadImage2");
Route::get('api/posts/download', "PostController@getImage2")->name("posts.getImage2");
Route::get('api/posts/{post}/image', "PostController@getImage")->name("posts.getImage");

Route::resources([
    'api/categories' => 'CategoryController',
    'api/posts' => 'PostController',
    'api/users' => 'UserController',
]);
