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
}

