import { NextFunction, Request, Response } from "express";

import { DeliveryModel } from "./deliveryModel";

export const getDeliveries = async (req: Request, res: Response) => {
  const deliveries = await DeliveryModel.find();
  res.status(200).json(deliveries);
};

export const getDelivery = async (req: Request, res: Response) => {};

export const registerDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const delivery = new DeliveryModel(req.body);
    await delivery.save();
    res.status(200).json(delivery);
  } catch (err) {
    next(err);
  }
};

export const updateDelivery = async (req: Request, res: Response) => {
  const delivery = await DeliveryModel.findById(req.params.id);
  console.log(delivery);
  res.status(200).json(delivery);
};

export const deleteDelivery = async (req: Request, res: Response) => {
  res.status(200).json("Delivery deleted");
};
