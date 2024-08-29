"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import OrderTable, { OrderTableProps } from "./OrderTable";
import AddOrderForm from "./AddOrderForm";

const OrdersPage: React.FC = () => {
	const [orders, setOrders] = useState<OrderTableProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchOrders = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/orders");
			if (!response.ok) {
				throw new Error(
					"Failed to fetch orders: Please wait 50secs and try again as this is a free tier Lambda function with cold start. Thank you!"
				);
			}
			const data = await response.json();
			if (Array.isArray(data.data)) {
				setOrders(data.data);
			} else {
				throw new Error("No Orders Found");
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const handleOrderAdded = () => {
		fetchOrders(); // Refresh the order list
	};

	const handleStatusChange = async (id: number, newStatus: string) => {
		try {
			const response = await fetch(`/api/orders?id=${id}`, {
				// Include id in the query string
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: newStatus }),
			});
			if (!response.ok) {
				return toast.error("Failed to update order status");
			}
			toast.success("Order status updated successfully");
			fetchOrders(); // Refresh the order list after status change
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-gray-500"></div>
				<span className="ml-3 text-lg font-semibold text-teal-600">
					Loading...
				</span>
			</div>
		);

	if (error)
		return (
			<div className="flex items-center justify-center min-h-[200px] text-rose-500">
				<svg
					className="w-6 h-6 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span className="text-lg font-semibold">{error}</span>
			</div>
		);

	if (orders.length === 0)
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<svg
					className="w-6 h-6 mr-2 text-gray-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4m0 4h.01M20.24 7.76a9 9 0 00-12.48 0m0 0L5 9m0 0L3.76 7.76a9 9 0 0112.48 0z"
					/>
				</svg>
				<span className="text-lg font-semibold text-gray-500">
					No Orders Found
				</span>
			</div>
		);

	return (
		<div className="p-4">
			<AddOrderForm onOrderAdded={handleOrderAdded} />
			<OrderTable orders={orders} onStatusChange={handleStatusChange} />
		</div>
	);
};

export default OrdersPage;
