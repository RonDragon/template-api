import * as express from "express";
import * as compression from "compression";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";

const bodyParser = require("body-parser");
const allowedOrigins = {
  dev: ["http://localhost:4200"],
  prod: [""],
};
function getOrigin(origin: string): boolean {
  console.log("NODE_ENV", NODE_ENV);

  if (NODE_ENV === "dev") {
    return allowedOrigins.dev.indexOf(origin) === -1;
  } else {
    return allowedOrigins.prod.indexOf(origin) === -1;
  }
}
const corsOptions = {
  origin: function (origin: string, callback: any) {
    console.log("origin is : ", origin);
    if (!origin) return callback(null, true);
    if (getOrigin(origin)) {
      const msg =
        "$$$The CORS policy for this site does not " +
        "allow access from the specified Origin:=> " +
        origin +
        "<==";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const { PORT = 3000, NODE_ENV = "test" } = process.env;

const IN_PROD = NODE_ENV === "production";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.controllers();
    console.log(`starting at : ${new Date()} on port ${PORT}`);
  }
  public config(): void {
    const app = this.app;
    app.set("port", process.env.PORT || 3000);
    app.use(express.json());
    //     app.use(express.urlencoded({ extended: false }));
    app.use(cors(corsOptions));
    //     app.use(compression());
    //     app.use(cookieParser());
    //     app.use(bodyParser.json());
  }
  controllers() {
    this.app.get("/", (req, res) => {
      res.send({ rc: 0, desc: "", user: { name: "yonatan", age: 28 } });
    });
    const user = require("./api/user.api");
    this.app.use("/api/user", user);
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log("API IS RUNNIG AT http://localhost:%d", PORT);
      console.log("Enviroment", NODE_ENV);
    });
  }
}

const server = new Server();
server.start();