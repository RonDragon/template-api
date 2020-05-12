import { Request, Response } from "express";

export let getUsers = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    console.log("==========================");
    console.log("==========================");
    console.log(req.params);
    console.log("==========================");
    const user = {
      name: "ronel",
      age: 27,
      email: "ronel_d@max.co.il",
    };
    res.send({ rc: 0, desc: "", user });
  } catch (error) {
    res.status(500).json({ rc: 99, desc: "general error" });
  }
};
export let createUser = async (req: Request, res: Response) => {
  try {
    const p = req.body;
    console.log("==========================");
    console.log("==========================");
    console.log(p);
    console.log("==========================");

    res.send({ rc: 0, desc: "" });
  } catch (error) {
    res.status(500).json({ rc: 99, desc: "general error" });
  }
};
