<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table            = 'products';
    protected $primaryKey       = 'id';
  
    protected $allowedFields    = ['name', 'category_id', 'supplier_id', 'quantity', 'price'];


    // Timestamps
    protected $useTimestamps = true;
      protected $createdField  = 'created_at';
    protected $updatedField  = '';
   
    // Validation
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
    
}
