import { NextFunction, Request, Response } from "express";
import { Order } from "../order/order.model";
import { ProductModel, Product } from "./product.model";

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


    if (!req.body) {
        res.status(400)
        throw new Error('Fill in required fields.')

    }

    try {
        const product = new ProductModel(req.body);
        await product.save();
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


    const product = await ProductModel.findById(req.params.id);

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body.newProductData, {
        new: true
    })

    res.status(200).json(updatedProduct);
};


// Delete a product by id
export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {

    const { id } = req.params

    const product = await ProductModel.findById(id)

    if (!product) {
        return res
            .status(404)
            .send({ error: true, msg: 'This product does not exist' });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(id)

    res.status(200).json('You have the deleted the product: ' + id);
};

export const updateStock = async (order: Order) => {
    for (const product of order.products) {
        await ProductModel.findByIdAndUpdate(
            product._id,
            { $inc: { "quantity": -product.qty } })
    }
}