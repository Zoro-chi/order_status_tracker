import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "Cybership",
	description: "Efficient platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} bg-slate-200  text-slate-700`}>
				<Toaster
					toastOptions={{
						style: {
							background: "rgb(51 65 85)",
							color: "#fff",
						},
					}}
				/>
				{children}
			</body>
		</html>
	);
}
