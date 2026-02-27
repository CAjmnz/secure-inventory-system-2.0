<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Handle preflight OPTIONS requests
$routes->options('api/auth/login',        function() { return service('response')->setStatusCode(200); });
$routes->options('api/categories',        function() { return service('response')->setStatusCode(200); });
$routes->options('api/categories/(:num)', function() { return service('response')->setStatusCode(200); });

// API Routes
$routes->group('api', function($routes) {
    // Auth
    $routes->post('auth/login', 'Auth::login');

    // Categories
    $routes->get('categories',           'Categories::index');
    $routes->get('categories/(:num)',    'Categories::show/$1');
    $routes->post('categories',          'Categories::create');
    $routes->put('categories/(:num)',    'Categories::update/$1');
    $routes->delete('categories/(:num)', 'Categories::delete/$1');
});