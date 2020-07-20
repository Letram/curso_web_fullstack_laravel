<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use App\User;
use Faker\Generator as Faker;

$factory->define(\App\Post::class, function (Faker $faker) {
    $user_ids = User::all()->pluck("id");
    $category_ids = Category::all()->pluck("id");
    return [
        "title" => $faker->sentence,
        "content" => $faker->paragraph(9),
        "user_id" => $user_ids->random(),
        "category_id" => $category_ids->random(),
    ];
});
