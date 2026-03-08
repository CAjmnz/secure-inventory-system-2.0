<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table      = 'products';
    protected $primaryKey = 'id';

    protected $allowedFields = ['name', 'category_id', 'supplier_id', 'quantity', 'price'];

    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = '';

    public function getProductsWithDetails()
    {
        return $this->db->table('products p')
            ->select('p.*, c.name as category_name, s.name as supplier_name')
            ->join('categories c', 'c.id = p.category_id', 'left')
            ->join('suppliers s', 's.id = p.supplier_id', 'left')
            ->orderBy('p.created_at', 'DESC')
            ->get()
            ->getResultArray();
    }

    public function getLowStockProducts($threshold = 10)
    {
        return $this->db->table('products p')
            ->select('p.*, c.name as category_name, s.name as supplier_name')
            ->join('categories c', 'c.id = p.category_id', 'left')
            ->join('suppliers s', 's.id = p.supplier_id', 'left')
            ->where('p.quantity <=', $threshold)
            ->orderBy('p.quantity', 'ASC')
            ->get()
            ->getResultArray();
    }

    public function getInventoryValueByCategory()
    {
        return $this->db->table('products p')
            ->select('c.name as category_name, 
                      COUNT(p.id) as total_products,
                      SUM(p.quantity) as total_quantity,
                      SUM(p.quantity * p.price) as total_value')
            ->join('categories c', 'c.id = p.category_id', 'left')
            ->groupBy('c.id')
            ->orderBy('total_value', 'DESC')
            ->get()
            ->getResultArray();
    }
}