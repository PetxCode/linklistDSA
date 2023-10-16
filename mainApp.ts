import { Application, Request, Response } from "express";

import { v4 as uuid } from "uuid";
import moment from "moment";

import path from "path";
import fs from "fs";

let database: Array<{}> = [];

export const mainApp = (app: Application) => {
  app.get("/read-data", (req: Request, res: Response): any => {
    try {
      let myPath = path.join(__dirname, "./database.json");

      fs.readFile(myPath, (err, data) => {
        if (err) {
          return err;
        } else {
          let readableData = JSON.parse(Buffer.from(data).toString());

          return res.status(200).json({
            message: "reading data",
            data: readableData,
          });
        }
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error reading data",
      });
    }
  });

  app.post("/create-data", (req: Request, res: Response): Response => {
    try {
      const { name, email } = req.body;

      const data = {
        id: uuid(),
        name,
        email,
        createdAt: moment(new Date().getTime()).format("LTS"),
      };

      database.push(data);

      let myPath = path.join(__dirname, "./database.json");

      fs.writeFile(myPath, JSON.stringify(database), () => {
        console.log(`Data saved`);
      });

      return res.status(200).json({
        message: "creating data",
        data,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error creating data",
      });
    }
  });

  app.patch("/update-data/:userID", (req: Request, res: Response): Response => {
    try {
      const { name } = req.body;
      const { userID } = req.params;

      const findUser: any = database.find((el: any) => {
        return el.id === userID;
      });

      findUser.name = name;

      return res.status(200).json({
        message: "updating data",
        data: findUser,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error updating data",
      });
    }
  });

  app.delete(
    "/delete-data/:userID",
    (req: Request, res: Response): Response => {
      try {
        const { userID } = req.params;

        const findUser: any = database.find((el: any) => {
          return el.id === userID;
        });

        const removeUser: any = database.filter((el: any) => {
          return el.id !== userID;
        });

        database = removeUser;

        return res.status(201).json({
          message: `${findUser.name} has been removed successfully`,
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error deleting data",
        });
      }
    }
  );
};
