<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DoiTuong extends Model
{
    protected $table = "doituong";

    public function hinhanhs()
    {
        return $this->hasMany('App\HinhAnh', 'doituongid');
    }

    public function remove() {
        if($this->hinhanhs != null && count($this->hinhanhs) > 0) {
            foreach($this->hinhanhs as $hinhanh) {
                $filePath = public_path(). '/images/' . $hinhanh->hinhanh;
                unlink($filePath);
            }
        }
        $this->hinhanhs()->delete();
        $this->delete();
    }
}

