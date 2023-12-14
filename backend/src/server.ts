import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import { userRoute } from "./routes/userRoute";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: error.message,
  });
});


app.listen(4000, () => {
  console.log("Server active on port 4000");
});
