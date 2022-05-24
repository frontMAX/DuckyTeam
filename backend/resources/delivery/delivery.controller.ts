import { NextFunction, Request, Response } from "express";

import { DeliveryModel } from "./delivery.model";

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

export const updateDelivery = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const delivery = await DeliveryModel.findById(req.params.id);
  if (!delivery) {
    return res.status(400).send("Couldnt find item");
  }
  const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  console.log(updatedDelivery);
  res.status(200).json(updatedDelivery);
};

export const deleteDelivery = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const delivery = await DeliveryModel.findById(req.params.id);
  if (!delivery) {
    return res.status(404).send("Couldnt find item");
  } else {
    const deletedDelivery = await DeliveryModel.findByIdAndDelete(
      req.params.id
    );
    console.log(deletedDelivery + "is deleted");
    res.status(200).json(deletedDelivery);
  }
};
