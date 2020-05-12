import * as express from "express";
import { getUsers, createUser } from "../controller/user.controller";

const router = express.Router();

router.get("/get", getUsers);
router.get("/get/:uid", getUsers);
router.post("/", createUser);

module.exports = router;
