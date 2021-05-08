<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable=['name','description','category_id','user_id','statu'];

    public function category(){
        return $this->belongsTo(category::class);
    }
    public function user(){
        return $this->belongsTo(user::class);
    }
}
