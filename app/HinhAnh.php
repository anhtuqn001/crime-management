<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HinhAnh extends Model
{
    protected $table = "hinhanhs";
    
    public function doituong() {
    return $this->belongsTo('App\DoiTuong', 'doituongid');
    }
}