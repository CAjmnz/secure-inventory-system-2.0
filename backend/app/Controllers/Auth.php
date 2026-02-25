<?php

namespace App\Controllers;

use App\Models\UserModel;

class Auth extends BaseController
{
    public function login()
    {
        $username = $this->request->getJSON()->username ?? '';
        $password = $this->request->getJSON()->password ?? '';

        if (empty($username) || empty($password)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => 'error',
                'message' => 'All fields are required.'
            ]);
        }

        $userModel = new UserModel();
        $user = $userModel->getUserByUsername($username);

        if ($user && password_verify($password, $user['password'])) {
            // Simple token (we'll improve this later)
            $token = bin2hex(random_bytes(32));

            return $this->response->setJSON([
                'status'   => 'success',
                'token'    => $token,
                'username' => $user['username']
            ]);
        }

        return $this->response->setStatusCode(401)->setJSON([
            'status'  => 'error',
            'message' => 'Invalid username or password.'
        ]);
    }
}