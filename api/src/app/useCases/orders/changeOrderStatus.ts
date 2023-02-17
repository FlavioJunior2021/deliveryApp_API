/* eslint-disable indent */
/* eslint-disable quotes */
import { Request, Response } from "express";

import { Order } from "../../models/Order";

export async function changeOrderStatus(req: Request, res: Response){
  const { orderId } = req.params;
  const { status } = req.body;

  if(!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)){
    return res.status(400).json();
  }
  await Order.findByIdAndUpdate(orderId, { status });
  res.sendStatus(204);
}

