import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to My Todo App");
});

app.listen(port, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
