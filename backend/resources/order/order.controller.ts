import { NextFunction, Request, Response } from "express";
import { OrderModel, Order } from "./order.model"


export const getOrders = async (req: Request, res: Response) => {
    // const query = req.session?.user.isAdmin ? {} : { user: req.session?.user } // för säkerheten admin

    // component som kan återanvändas, admin 

    const orders = await OrderModel.find({}).populate('user');
    res.status(200).json(orders);
};

export const addOrder = async (
    req: Request<{}, {}, Order>,
    res: Response,
    next: NextFunction
) => {
    // TODO: How do we handle errors in async middlewares?
    try {
        const order = new OrderModel(req.body);
        await order.save();
        // console.log(user.fullname);
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};
export const updateOrder = async (
    req: Request<{ id: string }>,
    res: Response
) => {

    const order = await OrderModel.findById(req.params.id);

    if (!order) {
        res.status(400)
        throw new Error('Product not found')
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    console.log(updatedOrder);
    res.status(200).json(updatedOrder);
};

export const deleteOrder = async (req: Request, res: Response) => {
    let selectedOrder = await OrderModel.findById({ _id: req.params.id });
    if (!selectedOrder) {
        res.status(404).json("order does not exist")
    }
    if (selectedOrder) {
        let deleteOrder = await OrderModel.findByIdAndDelete({ _id: req.params.id })
            .then(() => res.status(200).json("order is deleted!! "))
            .catch((err) => res.status(404).json("error: " + err));
    }
};

