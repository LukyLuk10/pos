"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const dailyIntake_routes_1 = require("./routes/dailyIntake-routes");
const user_routes_1 = require("./routes/user-routes");
const food_routes_1 = require("./routes/food-routes");
const app = (0, express_1.default)();
const port = 3000; //config.get<number>('appConfig.port');
const origin = config_1.default.get('appConfig.origin');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: origin }));
app.use('/dailyintake', dailyIntake_routes_1.dailyIntakeRouter); // Assuming this is your daily intake route
app.use('/users', user_routes_1.userRouter); // Assuming this is your user route
app.use('/foods', food_routes_1.foodRouter); // Assuming this is your food route
// Error handling middleware
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send('Something broke!  ' + err);
}
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
