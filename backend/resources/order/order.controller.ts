import { NextFunction, Request, Response } from "express";
import { DeliveryModel } from "../delivery/delivery.model";
import { updateStock } from "../product/product.controller";
import { User, UserModel } from "../user/user.model";
import { Order, OrderModel, OrderProduct } from "./order.model"


export const getOrders = async (req: Request, res: Response) => {
    const orders = await OrderModel.find({}).populate('user');
    res.status(200).json(orders);
};


// Get a single order by id
export const getOrder = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    const order = await OrderModel.findById(id).populate('user')
    if (!order) {
        return res
            .status(400)
            .send({ error: true, msg: 'order not found' })
    }
    res.status(200).json(order)
};

export interface ShippingAdress {
    firstName: string;
    lastName: string;
    streetAdress: string;
    postCode: string;
    city: string;
    phoneNumber: string;
    emailAdress: string;
}

export type CartType = {
    _id: string
    title: string
    description: string
    price: number
    qty: number
    imgURL: string
}

export interface NewOrderData {
    shipping: ShippingAdress,
    user: User,
    orderTotal: number,
    delivery: string,
    products: OrderProduct[],
}


export const addOrder = async (
    req: Request<{}, {}, NewOrderData>,
    res: Response,
    next: NextFunction
) => {
    try {
        const delivery = await DeliveryModel.findById(req.body.delivery)

        if (delivery === null) {
            return res.status(400).json('bad delivery.')
        }

        if (!req.session?.user) {
            return res.status(400).json('No user logged in.')
        }

        let user = await UserModel.findById(req.session.user._id);


        if (user === null) {
            res.status(404).json("user does not exist");
            return;
        }

        const newOrderData: Order = {
            orderNumber: Math.floor(Math.random() * 1000000).toString(),
            products: req.body.products,
            shipping: req.body.shipping,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: user,
            delivery: {
                name: delivery.name,
                price: delivery.price,
                logoUrl: delivery.logoId,
            },
            orderTotal: req.body.orderTotal + delivery.price,
            id: ""
        }

        const order = new OrderModel(newOrderData);
        await order.save();

        await updateStock(order)

        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}


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