<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Middleware\CustomAuthMiddleware;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Requests\UpdateImageUserRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        if ($request->has("page") && $request->page != 0)
            $data = DB::table('categories')
                ->select('categories.id', 'categories.name', DB::raw('count(posts.category_id) count'))
                ->leftJoin('posts', 'categories.id', '=', 'posts.category_id')
                ->groupBy('categories.id')
                ->orderBy('name')
                ->paginate(15);
        else
            $data = DB::table('categories')
                ->select('categories.id', 'categories.name', DB::raw('count(posts.category_id) count'))
                ->leftJoin('posts', 'categories.id', '=', 'posts.category_id')
                ->groupBy('categories.id')
                ->orderBy('name')
                ->get();
        return new JsonResponse([
            "status" => 1,
            "code" => 200,
            //"categories" => Category::all()
            "categories" => $data
        ], 200, ["Content-type" => "Application/json"]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\CreateCategoryRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateCategoryRequest $request)
    {
        $categoryData = $request->validated();
        $newCategory = (new Category)->create([
            "name" => $categoryData["name"]
        ]);

        $data = DB::table('categories')
            ->select('categories.id', 'categories.name', DB::raw('count(posts.category_id) count'))
            ->leftJoin('posts', 'categories.id', '=', 'posts.category_id')
            ->groupBy('categories.id')
            ->get();

        return new JsonResponse([
            "status" => 1,
            "code" => 200,
            "category" => $newCategory,
            "categories" => $data
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
        $category->delete();
        return new JsonResponse([
            "status" => 1,
            "code" => 200,
            "category" => $category,
            "categories" => Category::all()
        ], 200, [
            "Content-type" => "application/json"
        ]);
    }

    /**
     * @param \App\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function GetPosts(Category $category){
        $data = $category->posts;

        return response()->json($data);
        //return response()->json($category->posts);
    }
}
