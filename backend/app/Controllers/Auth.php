<?php

namespace App\Controllers;

use App\Models\UserModel;

class Auth extends BaseController
{
    public function index()
    {
        // If already logged in, go to dashboard
        if (session()->get('isLoggedIn')) {
            return redirect()->to('/dashboard');
        }
        return view('auth/login');
    }

public function login()
{
    $username = $this->request->getPost('username');
    $password = $this->request->getPost('password');

    if (empty($username) || empty($password)) {
        return redirect()->back()->with('error', 'All fields are required.');
    }

    $userModel = new UserModel();
    $user = $userModel->getUserByUsername($username);

    if ($user && password_verify($password, $user['password'])) {
        session()->set([
            'isLoggedIn' => true,
            'userId'     => $user['id'],
            'username'   => $user['username'],
        ]);
        return redirect()->to('/dashboard');
    }

    return redirect()->back()->with('error', 'Invalid username or password.');
}
    public function logout()
    {
        session()->destroy();
        return redirect()->to('/login');
    }
}