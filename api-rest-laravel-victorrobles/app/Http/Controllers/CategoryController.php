<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Middleware\CustomAuthMiddleware;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Requests\UpdateImageUserRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Psy\Util\Json;

class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware("web");
        $this->middleware(CustomAuthMiddleware::class)->only(["store", "update", "destroy"]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return new JsonResponse([
            "status" => 1,
            "code" => 200,
            "categories" => Category::all()
        ], 200, ["Content-type" => "Application/json"]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateCategoryRequest $request)
    {
        $categoryData = $request->validated();
        $newCategory = (new \App\Category)->create([
            "name" => $categoryData["name"]
        ]);

        return new JsonResponse([
            "status" => 1,
            "code" => 200,
            "category" => $newCategory
        ], 200, ["Content-type" => "application/json"]);

        //We could just return the list of categories that has the new one in it.
        //return response()->redirectTo(route("categories.index"));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Category $category)
    {
        return new JsonResponse([
            "status" => 1,
            "code" => 200,
            "category" => $category
        ], 200, ["Content-type" => "Application/json"]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateCategoryRequest $request
     * @param \App\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $categoryData = $request->validated();
        $category->update($categoryData);
        return new JsonResponse([
            "status" => 1,
            "code" => 200,
            "category" => $category
        ], 200, [
            "Content-type" => "application/json"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }

    /**
     * @param \App\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function GetPosts(Category $category){
        return response()->json($category->posts);
    }
}
