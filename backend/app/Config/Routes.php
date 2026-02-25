<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

//login routes

$routes->get('/',        'Auth::index');
$routes->get('/login',   'Auth::index');
$routes->post('/login',  'Auth::login');
$routes->get('/logout',  'Auth::logout');
$routes->get('/dashboard', 'Dashboard::index');
