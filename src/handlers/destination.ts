import { ResponseToolkit } from "@hapi/hapi";
import { IResponseObject } from "../types/types";
import { DB } from "../db";

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

  if (message.Meta.DataModel === 'Scheduling' && message.Meta.EventType === 'New') {
    const appointment = {
      patientFirstName: message.Patient.Demographics.FirstName,
      patientLastName: message.Patient.Demographics.LastName,
      patientIdentifiers: message.Patient.Identifiers,
      visitDateTime: message.Visit.VisitDateTime,
      visitReason: message.Visit.Reason,
      providerFirstName: message.Visit.AttendingProvider.FirstName,
      providerLastName: message.Visit.AttendingProvider.LastName,
      providerId: message.Visit.AttendingProvider.ID,
    }

    DB.appointments.push(appointment);

    console.log('apppointments', DB)

    
    return appointment;
  }

  return message;

};