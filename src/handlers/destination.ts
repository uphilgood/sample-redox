import { ResponseToolkit } from "@hapi/hapi";
import { IResponseObject } from "../types/types";

const DESTINATION_VERIFICATION_TOKEN = 'abcd1234'

export const getDestination = (
  r: any,
  h: ResponseToolkit
): any => {

  const verificationHeader = r.headers['verification-token'];

  if (verificationHeader  === DESTINATION_VERIFICATION_TOKEN) {
      console.log('verification token matched!');
      const challenge = r.query.challenge;
      return challenge;
  } else {
    console.log('verification token did not match!')
    return h.response('verification token did not match!').code(400)
  }

};



export const postDestination = (
  r: any,
  h: ResponseToolkit
): any => {

  const message = r.payload;

  console.log('message', r.payload)

  return message;

};