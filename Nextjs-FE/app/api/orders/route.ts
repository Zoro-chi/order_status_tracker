import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/orders?_=${Date.now()}`
		);
		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{ message: data.message || "Failed to fetch orders" },
				{ status: response.status }
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching orders:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { customer } = await request.json();

		if (!customer || typeof customer !== "string") {
			return NextResponse.json(
				{ message: 'Invalid or missing "customer" field' },
				{ status: 400 }
			);
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ customer }),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{ message: data.message || "Failed to add order" },
				{ status: response.status }
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error adding order:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const url = new URL(request.url); // Use URL to parse request URL
		const id = url.searchParams.get("id"); // Extract query parameter 'id'
		const { status } = await request.json();

		if (
			!id ||
			!status ||
			typeof id !== "string" ||
			typeof status !== "string"
		) {
			return NextResponse.json(
				{ message: 'Invalid or missing "id" or "status" field' },
				{ status: 400 }
			);
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/status`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{ message: data.message || "Failed to update order status" },
				{ status: response.status }
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error updating order status:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
