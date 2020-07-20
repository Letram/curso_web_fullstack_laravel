<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Post
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Post extends Model
{

    protected $table = "posts";

    protected $fillable = ["title", "content", "image_url", "category_id", "user_id"];
    /**
     * Es una relación de muchos a uno (una relación de pertenencia).
     * Al llamar a este método obtenemos el usuario que ha creado el post.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
       return $this->belongsTo("App\User", "user_id");
    }

    public function category(){
        return $this->belongsTo("App\Category", "category_id");
    }
}
