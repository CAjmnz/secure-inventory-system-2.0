<?php

namespace App\Controllers;

use App\Models\CategoryModel;

class Categories extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new CategoryModel();
    }

    // GET all categories
    public function index()
    {
        $categories = $this->model->orderBy('created_at', 'DESC')->findAll();
        return $this->response->setJSON([
            'status' => 'success',
            'data'   => $categories
        ]);
    }

    // GET single category
    public function show($id)
    {
        $category = $this->model->find($id);
        if (!$category) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => 'error',
                'message' => 'Category not found.'
            ]);
        }
        return $this->response->setJSON([
            'status' => 'success',
            'data'   => $category
        ]);
    }

    // POST create category
    public function create()
    {
        $data = $this->request->getJSON();

        if (empty($data->name)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => 'error',
                'message' => 'Category name is required.'
            ]);
        }

        $this->model->insert([
            'name'        => $data->name,
            'description' => $data->description ?? ''
        ]);

        return $this->response->setStatusCode(201)->setJSON([
            'status'  => 'success',
            'message' => 'Category created successfully.'
        ]);
    }

    // PUT update category
    public function update($id)
    {
        $category = $this->model->find($id);
        if (!$category) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => 'error',
                'message' => 'Category not found.'
            ]);
        }

        $data = $this->request->getJSON();

        $this->model->update($id, [
            'name'        => $data->name ?? $category['name'],
            'description' => $data->description ?? $category['description']
        ]);

        return $this->response->setJSON([
            'status'  => 'success',
            'message' => 'Category updated successfully.'
        ]);
    }

    // DELETE category
    public function delete($id)
    {
        $category = $this->model->find($id);
        if (!$category) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => 'error',
                'message' => 'Category not found.'
            ]);
        }

        $this->model->delete($id);

        return $this->response->setJSON([
            'status'  => 'success',
            'message' => 'Category deleted successfully.'
        ]);
    }
}