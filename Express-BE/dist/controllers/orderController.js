"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOrderStatus = exports.createOrder = exports.getOrders = void 0;
const prismaDb_1 = __importDefault(require("../libs/prismaDb"));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
const getOrders = async (req, res, next) => {
    try {
        const orders = await prismaDb_1.default.order.findMany({
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
    }
    catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.getOrders = getOrders;
const createOrder = async (req, res, next) => {
    const { customer } = req.body;
    if (!customer || typeof customer !== "string") {
        return res.status(400).json({
            status: "fail",
            message: "Invalid or missing 'customer' field",
        });
    }
    try {
        // Hardcode status as 'PENDING'
        const newOrder = await prismaDb_1.default.order.create({
            data: {
                customer,
                status: "PENDING",
            },
        });
        res.status(201).json({
            status: "success",
            data: newOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.createOrder = createOrder;
const changeOrderStatus = async (req, res, next) => {
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
    if (!Object.values(OrderStatus).includes(status)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid status value",
        });
    }
    try {
        // Update the order status
        const updatedOrder = await prismaDb_1.default.order.update({
            where: { id: Number(id) },
            data: { status: status }, // Cast to enum
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
    }
    catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.changeOrderStatus = changeOrderStatus;
