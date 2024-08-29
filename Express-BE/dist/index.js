"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import router from "../src/routes/orderRoute";
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 2121;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ROUTE
app.use("/api/orders", orderRoute_1.default);
//* ERROR HANDLING FOR UNDEFINED ROUTES
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    return res.status(404).json({
        status: "fail",
        message: error.message,
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
