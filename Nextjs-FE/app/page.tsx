import OrdersTable from "./components/orderTable/OrderTable";

export default function Home() {
	return (
		<div className="flex justify-center items-center p-4">
			<div className="w-full max-w-4xl">
				<OrdersTable />
			</div>
		</div>
	);
}
