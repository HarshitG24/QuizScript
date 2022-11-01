import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import game from "./controller/game.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { dirname } from "path";

import indexRouter from "./routes/index.js";
import newUserRouter from "./routes/newuser.js";
import addCategories from "./routes/categories.js";
import addQuestion from "./routes/questions.js";
import mulResults from "./routes/quizResults.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
  pingTimeout: 60000,
});

// app.set("view engine", "ejs");
app.set("views", dirname + "/views");
// app.set("layout", "layouts/layout");
// app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: {},
  })
);

app.use("/", indexRouter);
app.use("/newuser", newUserRouter);
app.use("/categories", addCategories);
app.use("/questions", addQuestion);
app.use("/quizResult", mulResults);

io.on("connection", (socket) => {
  game.handle(socket);
  // sc.score(socket);
});

httpServer.listen(process.env.PORT || 3000);

export default app;
