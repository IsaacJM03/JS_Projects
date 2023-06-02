const express = require('express');
const app = express();
const Product = require('./models/productModel')

app.use(express.json());
const mongoose = require('mongoose');

mongoose.set("strictQuery",false);
mongoose.
connect('mongodb+srv://mwesigwaisaac40:HxbItYthIXoanPOO@cluster0.1tbozju.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000,()=> {
        console.log('App is running on port 3000')
    })
    console.log('Connected');
}).catch((error)=>{
    console.log(error)
})
//routes
app.get('/',(req,res)=>{
    res.send('Hello man')
})
  
app.post('/products',async(req,res)=>{
    try {
        const products = await Product.create(req.body);
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.get('/products',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/products/:id',async(req,res)=> {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id',async(req,res)=> {
    try {
        const {id} = req.params;
        const products = await Product.findByIdAndUpdate(id,req.body);
        if(!products){
            res.status(404).json({message: `Cannot find product with ID: ${id}`});
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id',async(req,res)=> {
    try {
        const {id} = req.params;
        const products = await Product.findByIdAndDelete(id);
        if(!products){
            return res.status(404).json({message: `Cannot find product with ID : ${id}`})
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})