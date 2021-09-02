import { ResponseToolkit } from "@hapi/hapi";
import { DB } from "../db";




export const appointments = (
  r: any,
  h: ResponseToolkit
): any => {

    const appointments = DB.appointments;

    return appointments;


};
