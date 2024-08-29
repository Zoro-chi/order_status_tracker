import { NextFunction, Request, Response } from "express";

import express from "express";

import router from "../src/routes/orderRoute";

const app = express();
const PORT = process.env.PORT || 2121;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE
app.use("/api/orders", router);

//* ERROR HANDLING FOR UNDEFINED ROUTES
app.all("*", (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Can't find ${req.originalUrl} on this server!`);
	return res.status(404).json({
		status: "fail",
		message: error.message,
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
