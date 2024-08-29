"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface AddOrderFormProps {
	onOrderAdded: () => void; // Callback function to be called after adding an order
}

const AddOrderForm: React.FC<AddOrderFormProps> = ({ onOrderAdded }) => {
	const [customer, setCustomer] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await fetch("/api/orders", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ customer }), // Assuming default status is "pending"
			});
			if (!response.ok) {
				return toast.error("Failed to add order");
			}
			toast.success("Order added successfully");
			setCustomer("");
			onOrderAdded(); // Call the callback to refresh the order list
		} catch (error) {
			console.error("Error adding order:", error);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="w-full max-w-md p-4 bg-white shadow-md rounded">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="customer"
							className="block text-sm text-center font-medium text-gray-700"
						>
							Customer Name
						</label>
						<Input
							id="customer"
							type="text"
							value={customer}
							onChange={(e) => setCustomer(e.target.value)}
							required
							className="mt-1 block w-full"
						/>
					</div>
					<Button type="submit" className="w-full">
						Add Order
					</Button>
				</form>
			</div>
		</div>
	);
};

export default AddOrderForm;
