const mongoose = require("mongoose");
const Category = require("../model/category");

exports.category_post = (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    date:req.body.date
  });
  category
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created category successfully",
        createdCategory: {
          name: result.name,
          date: result.date,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:5000/category/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.category_get_all = (req, res, next) => {
  Category.find()
    .then(result => {
      res.status(200).json({
        count: result.length,
        category: result.map(item => {
          return {
            _id: item._id,
            name: item.name,
            date: item.date,
            request: {
              type: "GET",
              url: "http://localhost:5000/category/" + item._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.category_get_one = (req, res, next) => {
  Category.findById(req.params.categoryId)
    .then(result => {
      if (result) {
        res.status(200).json({
          _id: result._id,
          name: result.name,
          date: result.date,
          request: {
            type: "GET",
            url: "http://localhost:5000/category/" + result._id
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for category ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.category_delete = (req, res, next) => {
    const id = req.params.categoryId;
    Category.remove({ _id: id })
    .then(result => {
      res.status(200).json({
        message: "Category Deleted",
        request: {
          body: { name: "String" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.category_put = (req, res, next)=>{
  const id = req.params.categoryId;
  Category.findByIdAndUpdate({ _id: id},req.body)
    .exec()
    .then(() => {
      Category.findOne({ _id: id})
      .then(result=>{
        res.status(200).json({
          category:result,
          message: "Category Updated",
          request: {
            type: "GET",
            url: "http://localhost:5000/category/" + result._id
          }
        });
      })
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
