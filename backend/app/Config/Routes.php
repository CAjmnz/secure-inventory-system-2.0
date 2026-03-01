<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Handle preflight OPTIONS requests
$routes->options('api/auth/login',        function() { return service('response')->setStatusCode(200); });
$routes->options('api/categories',        function() { return service('response')->setStatusCode(200); });
$routes->options('api/categories/(:num)', function() { return service('response')->setStatusCode(200); });
$routes->options('api/suppliers',         function() { return service('response')->setStatusCode(200); });
$routes->options('api/suppliers/(:num)',  function() { return service('response')->setStatusCode(200); });

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

    // Suppliers
    $routes->get('suppliers',           'Suppliers::index');
    $routes->get('suppliers/(:num)',    'Suppliers::show/$1');
    $routes->post('suppliers',          'Suppliers::create');
    $routes->put('suppliers/(:num)',    'Suppliers::update/$1');
    $routes->delete('suppliers/(:num)', 'Suppliers::delete/$1');
});