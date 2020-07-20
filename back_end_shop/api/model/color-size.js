const mongoose = require("mongoose");

const colorSizeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    color:{type:String, require:true},
    size:{type:String, require:true},
    soLuong:{type:Number, default:1},
    date: {
        type: Date,
        default: Date.now,
      },
    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true}
    

});


module.exports = mongoose.model('ColorSize', colorSizeSchema);