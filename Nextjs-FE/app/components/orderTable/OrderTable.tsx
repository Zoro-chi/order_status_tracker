"use client";

import { useEffect, useState, useMemo } from "react";
import { useTable, Column } from "react-table";
// import { Button } from "@shadcn/ui"; // Example shadcn component
// import "tailwindcss/tailwind.css";

interface OrdersTableProps {
	id: number;
	customer: string;
	status: string;
}

const OrdersTable: React.FC = () => {
	const [orders, setOrders] = useState<OrdersTableProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch("/api/orders");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setOrders(data.data);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	const columns: Column<OrdersTableProps>[] = useMemo(
		() => [
			{ Header: "Order ID", accessor: "id" },
			{ Header: "Customer Name", accessor: "customer" },
			{ Header: "Status", accessor: "status" },
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: orders });

	if (loading) return <div className="text-center">Loading...</div>;
	if (error)
		return <div className="text-center text-red-500">Error: {error}</div>;
	if (orders.length === 0)
		return <div className="text-center">No orders found</div>;

	return (
		<div className="p-4">
			{/* <Button className="mb-4">Fetch Orders</Button>{" "} */}
			{/* Example usage of shadcn component */}
			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className="min-w-full divide-y divide-gray-200 border-b border-gray-300"
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps()}
										className="px-6 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300"
									>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody
						{...getTableBodyProps()}
						className="bg-white divide-y divide-gray-200"
					>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} className="hover:bg-gray-100">
									{row.cells.map((cell) => (
										<td
											{...cell.getCellProps()}
											className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-l border-r border-gray-300 text-center"
										>
											{cell.render("Cell")}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrdersTable;
