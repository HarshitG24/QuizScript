const express = require("express");
const app = express();
// const expressLayouts = require("express-ejs-layouts");
const http = require("http").Server(app);
// const server = http.createServer(app);
const io = require("socket.io")(http);

const indexRouter = require("./routes/index");
const newUserRouter = require("./routes/newuser");
const addCategories = require("./routes/categories");

// app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// app.set("layout", "layouts/layout");
// app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/newuser", newUserRouter);
app.use("/categories", addCategories);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

// app.listen(process.env.PORT || 3000);
http.listen(process.env.PORT || 3000);
