<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Handle preflight OPTIONS requests
$routes->options('api/auth/login', function() {
    return service('response')->setStatusCode(200);
});

// API Routes
$routes->group('api', function($routes) {
    $routes->post('auth/login', 'Auth::login');
});