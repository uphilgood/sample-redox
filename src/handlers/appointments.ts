import { ResponseToolkit } from "@hapi/hapi";
import { DB } from "../db";
import { chain } from 'lodash';




export const appointments = (
  r: any,
  h: ResponseToolkit
): any => {

    const appointments = DB.appointments;

    return appointments;


};
