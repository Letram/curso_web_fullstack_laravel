<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

/**
 * Class Category
 *
 * @package App
 * @mixin \Barryvdh\LaravelIdeHelper\Eloquent
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Category extends Model
{
    protected $table = "categories";

    protected $fillable = ["name"];
    /**
     * Relación de uno a muchos. Cuando se llame a este método podremos ver todos los posts relacionados con una categoría.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts(){
        return $this->hasMany("App\Post")->with(["category", "user"]);
        //return $this->hasMany("App\Post", "category_id", "id");
    }
}
