<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HinhAnh extends Model
{
    protected $table = "hinhanhs";
    
    public function doituong() {
    return $this->belongsTo('App\DoiTuong', 'doituongid');
    }

    public function remove() {
        $this->removeCurrentImage();
        $this->delete();
    }

    public function removeCurrentImage() {
        if($this->hinhanh != null) {
            $filePath = public_path(). '/images/' . $this->hinhanh;
            unlink($filePath);
        }
    }
}