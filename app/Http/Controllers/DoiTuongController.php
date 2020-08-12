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
                    // for($i = 0; $i < count($hinhanhs); $i++) {
                    //     $fileName = $hinhanhs[$i]->getClientOriginalName();
                    //     $uniqueFileName = time(). $index . "-" . $fileName;
                    //     $file->storeAs('images', $uniqueFileName, 'public_images');
                    //     //store hinhanhs relationship
                    //     $hinhanh = new HinhAnh;
                    //     $hinhanh->hinhanh = $uniqueFileName;
                    //     $hinhanh->thoigian = $thoigians[$i];
                    //     $hinhanh->doituongid = $doituong->id;
                    //     $hinhanh->save();
                    //     $index++;
                    // }
                }
                
            } 
            catch(Exception $e) {
                return response()->json([
                    'error'=> $e->getMessage()
                    ]);
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
            
            $doituong = DoiTuong::findOrFail($id);
            $doituong->hovaten = $request->input('hovaten');
            $doituong->tenthuonggoi = $request->input('tenthuonggoi');
            $doituong->gioitinhnam = $request->input('gioitinhnam') == "true";
            $doituong->ngaysinh = $request->input('ngaysinh');
            $doituong->gcnthan = $request->input('gcnthan');
            $doituong->nhanthan = $request->input('nhanthan');
            $doituong->ghichu = $request->input('ghichu');
            try {
                if($request->hasFile('hinhanh')) {
                    if($doituong->hinhanh != null) {
                        $filePath = public_path(). '/images/' . $doituong->hinhanh;
                        unlink($filePath);
                    }
                    $fileName = $request->file('hinhanh')->getClientOriginalName();
                    $uniqueFileName = time(). "-" . $fileName;
                    $request->file('hinhanh')->storeAs('images', $uniqueFileName, 'public_images');
                    $doituong->hinhanh = $uniqueFileName;
                }
                $doituong->save();
            } 
            catch(Exception $e) {
                return response()->json([
                    'error'=> $e->getMessage()
                    ]);
            }
            $doituong->ngaysinh = date('d/m/Y', strtotime($doituong->ngaysinh));
            return response()->json([
                'success'=> $doituong
                ]);
    }

    public function destroy(Request $request, $id) {
        $doituong = DoiTuong::findOrFail($id);
        if($doituong->hinhanh != null) {
            $filePath = public_path(). '/images/' . $doituong->hinhanh;
            unlink($filePath);
        }
        $doituong->delete();
        return response()->json([
            'success'=> "Đã xóa đối tượng thành công"
            ]);
    }
}