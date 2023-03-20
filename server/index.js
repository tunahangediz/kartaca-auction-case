const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const socketHandler = require("./sockets/index");
let RedisStore = require("connect-redis").default;
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
} = require("./config/config");
let redisClient = redis.createClient({ url: "redis://redis", host: REDIS_URL });
let redisStore = new RedisStore({ client: redisClient });

const app = express();
const port = process.env.PORT || 4000;
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// to allow data transfer between client and server
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  // setted the cors origin to allow connections to react client
  cors: {
    origin: "http://localhost:3000",
  },
});
// pass to socket to handler to handle socket events
socketHandler(socketIO);

redisClient.connect().catch((err) => {
  console.log(err);
});

app.use(
  session({
    name: "sid",
    store: redisStore,
    secret: "secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
    saveUninitialized: false,
    resave: false,
  })
);

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("successfully connected to the database"))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
