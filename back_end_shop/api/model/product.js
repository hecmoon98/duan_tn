const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    images:{type:Array, require:true},
    name:{type:String, require:true},
    price:{type:Number, require:true},
    moTa:{type:String, require:true},
    chatLieu:{type:String, require:true},
    huongDanSD:{type:String, require:true},
    suKien:{type:String, require:true},
    date: {
        type: Date,
        default: Date.now,
      },
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:'Category', required:true}
    

});


module.exports = mongoose.model('Product', newsSchema);