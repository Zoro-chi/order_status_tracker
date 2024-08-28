// import type { NextApiRequest, NextApiResponse } from "next";

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
// 	try {
// 		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
// 		const data = await response.json();

// 		if (!response.ok) {
// 			return res
// 				.status(response.status)
// 				.json({ message: data.message || "Failed to fetch orders" });
// 		}

// 		return res.status(200).json(data);
// 	} catch (error) {
// 		console.error("Error fetching orders:", error);
// 		return res.status(500).json({ message: "Internal Server Error" });
// 	}
// }

import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
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
