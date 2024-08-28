import { Request, Response, NextFunction } from "express";

import prisma from "../libs/prismaDb";

export const getOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders = await prisma.order.findMany();
		if (!orders || orders.length === 0) {
			return res.json({ message: "No Orders" });
		}
		res.status(200).json({
			status: "success",
			data: orders,
		});
	} catch (error: any) {
		res.status(500).json({
			status: "fail",
			message: error.message,
		});
	}
};
