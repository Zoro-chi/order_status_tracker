import OrderPage from "./components/order/OrderPage";

export default function Home() {
	return (
		<div className="flex justify-center items-center p-4">
			<div className="w-full max-w-4xl">
				<OrderPage />
			</div>
		</div>
	);
}
