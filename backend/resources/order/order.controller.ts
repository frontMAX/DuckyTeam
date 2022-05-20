import { NextFunction, Request, Response } from "express";
// import { orderModel, Order} from "./order.model"


export const getOrder = async (req: Request, res: Response) => {
    const orders = await orderModle.find({});
    res.status(200).json(order)
};

export const addOrder = async (

) => {
    try {

    }
};


export const updateOrder = async (

) => { };

export const deleteOrder = async (req: Request, res: Response) => {

};