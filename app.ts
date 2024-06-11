import express from 'express';
import cors from 'cors';
import config from 'config';
import { dailyIntakeRouter } from "./routes/dailyIntake-routes";
import { userRouter } from "./routes/user-routes";
import { foodRouter } from "./routes/food-routes";

const app = express();
const port: number = 3000;//config.get<number>('appConfig.port');
const origin: string = config.get<string>('appConfig.origin');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: origin }));

app.use('/dailyintake', dailyIntakeRouter); // Assuming this is your daily intake route
app.use('/users', userRouter); // Assuming this is your user route
app.use('/foods', foodRouter); // Assuming this is your food route

// Error handling middleware
function errorHandler(err: any, req: any, res: any, next: any) {
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
