import { Request, Response, NextFunction } from "express";

import prisma from "../libs/prismaDb";

enum OrderStatus {
	PENDING = "PENDING",
	DELIVERED = "DELIVERED",
	CANCELLED = "CANCELLED",
}

export const getOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders = await prisma.order.findMany({
			select: {
				id: true,
				customer: true,
				status: true,
			},
			orderBy: {
				id: "asc",
			},
		});
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

export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { customer } = req.body;

	if (!customer || typeof customer !== "string") {
		return res.status(400).json({
			status: "fail",
			message: "Invalid or missing 'customer' field",
		});
	}

	try {
		// Hardcode status as 'PENDING'
		const newOrder = await prisma.order.create({
			data: {
				customer,
				status: "PENDING",
			},
		});

		res.status(201).json({
			status: "success",
			data: newOrder,
		});
	} catch (error: any) {
		res.status(500).json({
			status: "fail",
			message: error.message,
		});
	}
};

export const changeOrderStatus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const { status } = req.body;

	// Validate input
	if (!id || !status || typeof id !== "string" || typeof status !== "string") {
		return res.status(400).json({
			status: "fail",
			message: "Invalid or missing 'id' or 'status' field",
		});
	}

	// Ensure status is a valid enum value
	if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
		return res.status(400).json({
			status: "fail",
			message: "Invalid status value",
		});
	}

	try {
		// Update the order status
		const updatedOrder = await prisma.order.update({
			where: { id: Number(id) },
			data: { status: status as OrderStatus }, // Cast to enum
		});

		if (!updatedOrder) {
			return res.status(404).json({
				status: "fail",
				message: "Order not found",
			});
		}

		res.status(200).json({
			status: "success",
			data: updatedOrder,
		});
	} catch (error: any) {
		res.status(500).json({
			status: "fail",
			message: error.message,
		});
	}
};
