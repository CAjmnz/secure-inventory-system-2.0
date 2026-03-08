<?php

namespace App\Controllers;

use App\Models\ProductModel;
use App\Models\CategoryModel;
use App\Models\SupplierModel;

class Products extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ProductModel();

    }
    public function index()
    {
        $products = $this->model->getProductsWithDetails();

        return $this->response->setJSON([
            'status' => 'success',
            'data'   => $products
        ]);
    }

    public function show ($id)
    { 
        $product = $this->model->find($id);
         
        if (!$product) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => 'error',
                'message' => 'Product not found.'
            ]);
        }
        return $this->response->setJSON([
            'status' => 'success',
            'data'   => $product
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON();

        if (!$data) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => 'error',
                'message' => 'Invalid input.'
            ]);
        }

        $productId = $this->model->insert($data);

        if ($productId) {
            return $this->response->setStatusCode(201)->setJSON([
                'status' => 'success',
                'message' => 'Product created successfully.',
                'id' => $productId
            ]);
        } else {
            return $this->response->setStatusCode(500)->setJSON([
                'status' => 'error',
                'message' => 'Failed to create product.'
            ]);
        } 
    }
    public function update($id)
        {
            $product = $this->model->find($id);
            if (!$product) {
                return $this->response->setStatusCode(404)->setJSON([
                    'status' => 'error',
                    'message' => 'Product not found.'
                ]);
            }
        $data = $this->request->getJSON();
        
        $this->model->update($id, [
            'name'        => $data->name            ?? $product['name'],
            'category_id' => $data->category_id     ?? $product['category_id'],
            'supplier_id' => $data->supplier_id     ?? $product['supplier_id'],
            'quantity'    => $data->quantity        ?? $product['quantity'],
            'price'       => $data->price           ?? $product['price']
        ]);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Product updated successfully.'
        ]);
    }
    public function delete($id)
    {
        $product = $this->model->find($id);
        if (!$product){
            return $this->response->setStatusCode(404)->setJSON([
                'status' => 'error',
                'message' => 'Product not found.'
            ]);
        }
        $this->model->delete($id);
        
        return $this ->response->setJSON([
            'status' => 'success',
            'message' => 'Product deleted successfully.'
        ]);
    }
   public function getFormData()
    {
        $categoryModel = new CategoryModel();
        $supplierModel = new SupplierModel();

        return $this->response->setJSON([
            'status' => 'success',
            'categories' => $categoryModel->findAll(),
            'suppliers' => $supplierModel->findAll()    
        ]);
    }
    // GET products report
    public function report()
    {
        $products = $this->model->getProductsWithDetails();
        
        $totalProducts = count($products);
        $totalQuantity = array_sum(array_column($products, 'quantity'));
        $totalValue    = array_sum(array_map(fn($p) => $p['quantity'] * $p['price'], $products));

        return $this->response->setJSON([
            'status' => 'success',
            'data'   => [
                'products'       => $products,
                'total_products' => $totalProducts,
                'total_quantity' => $totalQuantity,
                'total_value'    => number_format($totalValue, 2)
            ]
        ]);
    }

    // GET low stock report
    public function lowStock()
    {
        $products = $this->model->getLowStockProducts();

        return $this->response->setJSON([
            'status' => 'success',
            'data'   => [
                'products' => $products,
                'count'    => count($products)
            ]
        ]);
    }

    // GET inventory value by category
    public function inventoryValue()
    {
        $data = $this->model->getInventoryValueByCategory();

        return $this->response->setJSON([
            'status' => 'success',
            'data'   => $data
        ]);
    }
}            