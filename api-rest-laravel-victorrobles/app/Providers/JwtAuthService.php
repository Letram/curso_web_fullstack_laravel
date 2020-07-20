<?php

namespace App\Providers;

use App\Helpers\JwtAuth;
use Illuminate\Support\ServiceProvider;

class JwtAuthService extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        require_once app_path().'/Helpers/JwtAuth.php';
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

    }
}
