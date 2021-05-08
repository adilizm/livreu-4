<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function update_user_profile(Request $request)
    {
       
        $request->validate([
            'new_profile_img' => 'bail|mimes:png,jpg|required',
        ]); 
       
          // cteate new empty Model 
        $user=User::FindOrFail($request->user_id);
        // create file path 
        $file_path = time() . '-' . $request->id  . 'profile_image.' . $request->new_profile_img->guessExtension();
        //store image in images folder which is in public and assigne other model values
         $request->new_profile_img->move(public_path('images'), $file_path);
         $user->profile_img = '/images/' . $file_path;
        $user->save();  
         
        return $user->profile_img;  
    }
}
