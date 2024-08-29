"use client";

import { useMemo } from "react";
import { useTable, Column } from "react-table";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select"; // Ensure the path is correct

export interface OrderTableProps {
	id: number;
	customer: string;
	status: string;
}

interface OrderTableComponentProps {
	orders: OrderTableProps[];
	onStatusChange: (id: number, newStatus: string) => void; // Callback function to handle status change
}

const OrderTable: React.FC<OrderTableComponentProps> = ({
	orders,
	onStatusChange,
}) => {
	const columns: Column<OrderTableProps>[] = useMemo(
		() => [
			{ Header: "Order ID", accessor: "id" }, // Unique accessor for ID
			{ Header: "Customer Name", accessor: "customer" }, // Unique accessor for customer
			{
				Header: "Status",
				accessor: "status", // Unique accessor for status
				Cell: ({ value }: { value: string }) => {
					let statusClass = "";
					switch (value.toLowerCase()) {
						case "delivered":
							statusClass = "text-teal-600 bg-teal-100";
							break;
						case "pending":
							statusClass = "text-amber-600 bg-amber-100";
							break;
						case "cancelled":
							statusClass = "text-rose-600 bg-rose-100";
							break;
						default:
							statusClass = "text-gray-600 bg-gray-100";
							break;
					}

					return (
						<span
							className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClass}`}
						>
							{value}
						</span>
					);
				},
			},
			{
				Header: "Change Status",
				id: "changeStatus", // Unique id for the action column
				Cell: ({ row }: { row: { original: OrderTableProps } }) => (
					<Select
						onValueChange={(newStatus) =>
							onStatusChange(row.original.id, newStatus)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Change status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="PENDING">Pending</SelectItem>
							<SelectItem value="DELIVERED">Delivered</SelectItem>
							<SelectItem value="CANCELLED">Cancelled</SelectItem>
						</SelectContent>
					</Select>
				),
			},
		],
		[onStatusChange]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: orders || [] });

	return (
		<div className="p-4">
			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className="min-w-full divide-y divide-gray-200 border-b border-gray-300"
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps()}
										className="px-6 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300"
										key={column.id}
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
								<tr
									{...row.getRowProps()}
									key={row.id}
									className="hover:bg-gray-100"
								>
									{row.cells.map((cell) => (
										<td
											{...cell.getCellProps()}
											className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-l border-r border-gray-300 text-center"
											key={cell.column.id}
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

export default OrderTable;
