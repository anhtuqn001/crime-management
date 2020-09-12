<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DoiTuong;
use App\HinhAnh;

class DoiTuongController extends Controller
{
    public function index() {
    $doituongs = DoiTuong::with(array('hinhanhs' => function($query){
        $query->orderBy('thoigian', 'ASC');
    }))->orderBy('id', 'DESC')->get();
    if(count($doituongs) > 0){
        foreach($doituongs as $doituong) {
            $doituong->ngaysinh = date('d/m/Y', strtotime($doituong->ngaysinh));
        }
    }
    return response()->json(['doituong' => $doituongs]);
    }

    public function store(Request $request) {
        // $messages = [
        //     'tenky.required' => 'Tên kỳ báo cáo không được bỏ trống',
        //     'mota.required'  => 'Mô tả không được bỏ trống'
        //     ];  
        // $validator = Validator::make($request->all(), [
        //     'tenky' => 'required',
        //     'mota' => 'required'
        // ], $messages);
        // if(!$validator->passes()){
        //     return response()->json(['error'=>$validator->errors()->all()]);
        // } else {
            
            $doituong = new DoiTuong;
            $doituong->hovaten = $request->input('hovaten');
            $doituong->tenthuonggoi = $request->input('tenthuonggoi');
            $doituong->gioitinhnam = $request->input('gioitinhnam') == "true";
            $doituong->ngaysinh = $request->input('ngaysinh');
            $doituong->gcnthan = $request->input('gcnthan');
            $doituong->nhanthan = $request->input('nhanthan');
            $doituong->lsnghe = $request->input('lsnghe');
            $doituong->ghichu = $request->input('ghichu');
            $doituong->save();
            try {
                if($request->hasFile('hinhanh')) {
                    $thoigians = $request->input('thoigian');
                    $index = 0;
                    foreach ($request->file('hinhanh') as $file) {
                    //upload files
                    $fileName = $file->getClientOriginalName();
                    $uniqueFileName = time(). $index . "-" . $fileName;
                    $file->storeAs('images', $uniqueFileName, 'public_images');
                    //store hinhanhs relationship
                    $hinhanh = new HinhAnh;
                    $hinhanh->hinhanh = $uniqueFileName;
                    $hinhanh->thoigian = $thoigians[$index];
                    $hinhanh->doituongid = $doituong->id;
                    $hinhanh->save();
                    $index++;
                    }
                }
            } 
            catch(Exception $e) {
                return response()->json([
                    'error'=> $e->getMessage()
                ], 500);
            }
            $doituong->ngaysinh = date('d/m/Y', strtotime($doituong->ngaysinh));
            $doituong->hinhanhs = $doituong->hinhanhs()->orderBy('thoigian', 'ASC')->get();
            return response()->json([
                'success'=> $doituong
                ]);
    }

    public function update(Request $request, $id) {
        // $messages = [
        //     'tenky.required' => 'Tên kỳ báo cáo không được bỏ trống',
        //     'mota.required'  => 'Mô tả không được bỏ trống'
        //     ];  
        // $validator = Validator::make($request->all(), [
        //     'tenky' => 'required',
        //     'mota' => 'required'
        // ], $messages);
        // if(!$validator->passes()){
        //     return response()->json(['error'=>$validator->errors()->all()]);
        // } else {
            // $counter = count($request->file('hinhanh'));
            $doituong = DoiTuong::findOrFail($id);
            $doituong->hovaten = $request->input('hovaten');
            $doituong->tenthuonggoi = $request->input('tenthuonggoi');
            $doituong->gioitinhnam = $request->input('gioitinhnam') == "true";
            $doituong->ngaysinh = $request->input('ngaysinh');
            $doituong->gcnthan = $request->input('gcnthan');
            $doituong->nhanthan = $request->input('nhanthan');
            $doituong->lsnghe = $request->input('lsnghe');
            $doituong->ghichu = $request->input('ghichu');
            $doituong->save();
            try {
                if($request->hasFile('hinhanh')) {
                    $thoigians = $request->input('thoigian');
                    $ids = $request->input('id');
                    $index = 0;
                    $filesStr = $request->input('hinhanhstr');
                    $files = $request->file('hinhanh');
                    $filesCounter = 0;
                    foreach ($filesStr as $str) {
                        $hinhanh = $ids[$index] == 'add' ? new HinhAnh : HinhAnh::findOrFail($ids[$index]);
                        if($thoigians[$index] == 'null') {
                            $hinhanh->remove();
                            $index++;
                            continue;
                        }
                        if($str != 'null') {
                        // $hinhanhDemo = $hinhanh;
                        $hinhanh->removeCurrentImage();
                        //store new image
                        $fileName = $files[$filesCounter]->getClientOriginalName();
                        $uniqueFileName = time(). $index . "-" . $fileName;
                        $files[$filesCounter]->storeAs('images', $uniqueFileName, 'public_images');
                        //store hinhanhs relationship
                        $hinhanh->hinhanh = $uniqueFileName;
                        $filesCounter++;
                        }
                        $hinhanh->thoigian = $thoigians[$index];
                        $hinhanh->doituongid = $id;
                        $hinhanh->save();
                        $index++;
                    }
                } else {
                    $ids = $request->input('id');
                    $thoigians = $request->input('thoigian');
                    $index = 0;
                    if($ids != null && count($ids) > 0) {
                        foreach($ids as $hinhanhId) {
                            $hinhanh = $hinhanhId == 'add' ? new HinhAnh : HinhAnh::findOrFail($hinhanhId);
                            if($thoigians[$index] == 'null') {
                                $hinhanh->remove();
                                $index++;
                                continue;
                            }
                            $hinhanh->thoigian = $thoigians[$index];
                            $hinhanh->doituongid = $id;
                            $hinhanh->save();
                            $index++;
                        }
                    }
                }
            } 
            catch(Exception $e) {
                return response()->json([
                    'error'=> $e->getMessage()
                    ]);
            }
            $doituong->ngaysinh = date('d/m/Y', strtotime($doituong->ngaysinh));
            $doituong->hinhanhs = $doituong->hinhanhs()->orderBy('thoigian', 'ASC')->get();
            $thoigians = $request->input('thoigian');
            return response()->json([
                'success'=> $doituong,

                ]);
    }

    public function destroy(Request $request, $id) {
        $doituong = DoiTuong::findOrFail($id);
        $doituong->remove();
        return response()->json([
            'success'=> $doituong
            ]);
    }

    public function storeMutipleItems(Request $request) {
        $doituongArr = $request->all();
        $doituongArrToReturn = array();
        try {
            if($doituongArr != null && count($doituongArr) > 0) {
                foreach($doituongArr as $doituong) {
                    $newDoituong = new DoiTuong;
                    $newDoituong->hovaten = $doituong['hovaten'];
                    $newDoituong->tenthuonggoi = array_key_exists('tenthuonggoi', $doituong) ? $doituong['tenthuonggoi'] : null;
                    $newDoituong->ngaysinh = join("-",array_reverse(explode("/", $doituong['ngaysinh'])));
                    $newDoituong->gioitinhnam = array_key_exists('gioitinhnam', $doituong) ? true : $doituong['gioitinhnam'] == "1";
                    $newDoituong->gcnthan = array_key_exists('gcnthan', $doituong) ? $doituong['gcnthan'] : null;
                    $newDoituong->nhanthan = array_key_exists('nhanthan', $doituong) ? $doituong['nhanthan'] : null;
                    $newDoituong->lsnghe = array_key_exists('lsnghe', $doituong) ? $doituong['lsnghe'] : null;
                    $newDoituong->ghichu = array_key_exists('ghichu', $doituong) ? $doituong['ghichu'] : null;
                    $newDoituong->save();
                    $newDoituong->ngaysinh = date('d/m/Y', strtotime($newDoituong->ngaysinh));
                    $newDoituong->hinhanhs = $newDoituong->hinhanhs()->orderBy('thoigian', 'ASC')->get();
                    array_push($doituongArrToReturn, $newDoituong);
                }
            }
        } catch (Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ]);
        }
        return response()->json([
            'success'=> $doituongArrToReturn
            ]);
    }

    
}