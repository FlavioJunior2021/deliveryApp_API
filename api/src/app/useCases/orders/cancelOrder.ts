/* eslint-disable indent */
/* eslint-disable quotes */
import { Request, Response } from "express";

import { Order } from "../../models/Order";

export async function cancelOrder(req: Request, res: Response){
  const { orderId } = req.params;
  const { status } = req.body;
  await Order.findByIdAndDelete(orderId, { status });
  res.sendStatus(204);
}

