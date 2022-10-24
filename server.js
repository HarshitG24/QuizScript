const express = require("express");
const app = express();
// const expressLayouts = require("express-ejs-layouts");
const http = require("http").Server(app);
// const server = http.createServer(app);
const io = require("socket.io")(http);
const game = require(__dirname + "/controller/game.js");

const indexRouter = require("./routes/index");
const newUserRouter = require("./routes/newuser");
const addCategories = require("./routes/categories");
const addQuestion = require("./routes/questions");
const mulResults = require("./routes/mulQuizResults");

// app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// app.set("layout", "layouts/layout");
// app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/newuser", newUserRouter);
app.use("/categories", addCategories);
app.use("/questions", addQuestion);
app.use("/mulResult", mulResults);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  game.handle(socket);
});

// app.listen(process.env.PORT || 3000);
http.listen(process.env.PORT || 3000);
