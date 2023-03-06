const express = require('express')

const routes = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product')

//---GETTING ALL THE PRODUCTS
routes.get('/', async (req, res, next) => {

    try {

        const docs = await Product.find({}).select('name price _id')
        const response = {
            count:docs.length,
            products:docs
        }
        console.log(response);
         res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})


//---CREATING A NEW PRODUCT
routes.post('/', async (req, res, next) => {

    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
        });


        const result = await product.save();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }


    // .then(result => {
    //     console.log(result);
    //     res.status(200).json({
    //         message: 'Handling POST request form /products',
    //         createdProduct: result
    //     })
    // }).catch(err => {
    //     err => console.log(err);
    //     res.status(500).json({
    //         error: err
    //     })
    // });


})

//---PATCHING A CERTAIN PRODUCT BASED ON ID---
routes.patch('/:productId', async (req, res, next) => {
    try {
        const id = req.params.productId;
        const productFetched = await Product.findById(id);
        productFetched.name = req.body.name;
        await productFetched.save();

        res.status(200).json(productFetched);
        console.log("updated the product successfully...")

    } catch (error) {

        res.status(500).json({
            message: error
        })

    }

    // res.status(200).json({
    //     message: 'Updated product'
    // })
});


//---DELETING A PRODUCT BASED ON ID----
routes.delete('/:productId', async(req, res, next) => {

try{

    const id = req.params.productId;
    const productOfInterest = await Product.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Deleted product',
        productDeleted:productOfInterest
    })
}
catch(error){
    res.status(500).json({
        message:error
    })
}

})

//---GETTING THE PRODUCT BY ID-----
routes.get('/:productId', async(req, res, next) => {
    try{
    const id = req.params.productId;
    const productOfInterest = await Product.findById(id);

    res.status(200).json(productOfInterest);

    }
    catch(error){
res.status(500).json({
    message:error
})
}
})
module.exports = routes;