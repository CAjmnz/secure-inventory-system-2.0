<?php
namespace App\Models;

use CodeIgniter\Model;

class Suppliersmodel extends Model 
{
    protected $table ='suppliers';
    protected $primaryKey ='id';
    protected $allowedFields = ['name', 'email', 'phone', 'address'];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = '';
}