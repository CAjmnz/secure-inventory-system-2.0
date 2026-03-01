<?php

namespace App\Controllers;

use App\Models\SupplierModel;

class Suppliers extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new SupplierModel();
    }

    public function index()
    {
        $suppliers = $this->model->orderBy('created_at', 'DESC')->findAll();
        return $this->response->setJSON([
            'status' => 'success',
            'data'   => $suppliers
        ]);
    }

    public function show($id)
    {
        $supplier = $this->model->find($id);
        if (!$supplier) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => 'error',
                'message' => 'Supplier not found.'
            ]);
        }
        return $this->response->setJSON([
            'status' => 'success',
            'data'   => $supplier
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON();

        if (empty($data->name)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => 'error',
                'message' => 'Supplier name is required.'
            ]);
        }

        $this->model->insert([
            'name'    => $data->name,
            'email'   => $data->email   ?? '',
            'phone'   => $data->phone   ?? '',
            'address' => $data->address ?? ''
        ]);

        return $this->response->setStatusCode(201)->setJSON([
            'status'  => 'success',
            'message' => 'Supplier created successfully.'
        ]);
    }

    public function update($id)
    {
        $supplier = $this->model->find($id);
        if (!$supplier) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => 'error',
                'message' => 'Supplier not found.'
            ]);
        }

        $data = $this->request->getJSON();

        $this->model->update($id, [
            'name'    => $data->name    ?? $supplier['name'],
            'email'   => $data->email   ?? $supplier['email'],
            'phone'   => $data->phone   ?? $supplier['phone'],
            'address' => $data->address ?? $supplier['address']
        ]);

        return $this->response->setJSON([
            'status'  => 'success',
            'message' => 'Supplier updated successfully.'
        ]);
    }

    public function delete($id)
    {
        $supplier = $this->model->find($id);
        if (!$supplier) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => 'error',
                'message' => 'Supplier not found.'
            ]);
        }

        $this->model->delete($id);

        return $this->response->setJSON([
            'status'  => 'success',
            'message' => 'Supplier deleted successfully.'
        ]);
    }
}