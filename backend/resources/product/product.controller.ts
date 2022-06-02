import { NextFunction, Request, Response } from "express";
import { ProductModel, Product } from "./product.model";

// update gty

// const updateAmount =  { $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }

// Get all products
export const getProducts = async (req: Request, res: Response) => {
    const products = await ProductModel.find({});
    res.status(200).json(products)
};


// Get a single product by id
export const getProduct = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    const product = await ProductModel.findById(id)
    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }
    res.status(200).json(product)
};


// register/add a new product
export const registerProduct = async (
    req: Request<{}, {}, Product>,
    res: Response,
    next: NextFunction
) => {

    // supposed to check cookie if admin
    // if (req.session.isAdmin !== 'true') {
    //     res.status(401);
    //     res.send({ message: 'Unauthorized register attempt.' });
    //     return;
    // }

    if (!req.body) {
        res.status(400)
        console.log('Fill in required fields.')
        throw new Error('Fill in required fields.')

    }

    try {
        const product = new ProductModel(req.body);
        await product.save();
        console.log(product.name);
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

// Update a product by id
export const updateProduct = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    // supposed to check cookie for admin
    // if (req.session.isAdmin !== 'true') {
    //     res.status(401);
    //     res.send({ message: 'Unauthorized save attempt.' });
    //     return;
    // }



    const product = await ProductModel.findById(req.params.id);

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    console.log(req.body)
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body.newProductData, {
        new: true
    })

    console.log(updatedProduct);
    res.status(200).json(updatedProduct);
};


// Delete a product by id
export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {

    // checks if cookie (if admin) is existing
    // if (req.session.isAdmin !== 'true') {
    //     res.status(401)
    //     res.send({ message: 'Need to be admin to delete a product.' })
    //     return
    // }

    const { id } = req.params

    const product = await ProductModel.findById(id)

    if (!product) {
        return res
            .status(404)
            .send({ error: true, msg: 'This product does not exist' });
    }

    // if (
    //     req.session.isAdmin !== 'true'
    // ) {
    //     res.status(403);
    //     res.send({
    //         message: 'You are not allowed to delete products.',
    //     });
    //     return;
    // }

    const deletedProduct = await ProductModel.findByIdAndDelete(id)

    res.status(200).json('You have the deleted the product: ' + id);
};