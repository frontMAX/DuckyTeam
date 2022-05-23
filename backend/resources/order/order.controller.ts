import { NextFunction, Request, Response } from "express";
import { UserModel, User } from "../user/user.model";
import { OrderModel, Order } from "./order.model"


export const getOrders = async (req: Request, res: Response) => {
    const users = await UserModel.find({});
    res.status(200).json(users);
};

export const addOrder = async (
    req: Request<{}, {}, User>,
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
    const order = await OrderModel.findById(req.params.id).select("+password");
    console.log(order);
    res.status(200).json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
    let selectedOrder = await OrderModel.findById({ _id: req.params.id });
    if (!selectedOrder) {
        res.status(404).json("user does not exist")

    }
    if (selectedOrder) {
        let deleteOrder = await OrderModel.findByIdAndDelete({ _id: req.params.id })
            .then(() => res.status(200).json("user is deleted!! "))
            .catch((err) => res.status(404).json("error: " + err));
    }
};
