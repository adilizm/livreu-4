<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ErrorAndSuccesController as ErrorAndSuccesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
   
class AuthController  extends ErrorAndSuccesController
{

    public function signin(Request $request)
    {
       
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $authUser = Auth::user(); 
            $success['token'] =  $authUser->createToken('MyAuthApp')->plainTextToken; 
            $success['name'] =  $authUser->name;
            $success['Role'] =  $authUser->Role;
            $success['id'] =  $authUser->id;
            $success['profile_img'] =  $authUser->profile_img;
           
   
            return $this->sendResponse($success, 'User signed in');
        } 
        else{ 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }

    public function signup(Request $request)
    {
       
         $request['Role']='cliente';
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
            'address' => 'required|string|min:10|max:120',
            'tel' => 'required|min:10|numeric',
        ]);
        if($validator->fails()){
            return $this->sendError('Error validation', $validator->errors());       
        } 
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyAuthApp')->plainTextToken;
        $success['name'] =  $user->name;

        return $this->sendResponse($success, 'User created successfully.');   

    }
    public function hello(){
        return 'gg';
    }
}