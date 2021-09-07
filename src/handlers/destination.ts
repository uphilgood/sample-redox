import { ResponseToolkit } from "@hapi/hapi";
import { IResponseObject } from "../types/types";
import { DB } from "../db";
import axios from "axios";
import { access } from "node:fs";

const DESTINATION_VERIFICATION_TOKEN = 'abcd1234'
const SOURCE_API_KEY = '0b2a1c68-15ee-4cbe-9983-29dd392d4d5c';
const SOURCE_SECERT = '9bHeXVeL46SBly7l4w96t7Leyi6C0GqzfN0Y1xjGiwlcuXe6F57ybwUzyvkahoUt79s9H1JQ';
let authToken: any, authTokenExpires: string | number | Date

export const getDestination = (
  r: any,
  h: ResponseToolkit
): any => {

  const verificationHeader = r.headers['verification-token'];

  if (verificationHeader === DESTINATION_VERIFICATION_TOKEN) {
    console.log('verification token matched!');
    const challenge = r.query.challenge;
    return challenge;
  } else {
    console.log('verification token did not match!')
    return h.response('verification token did not match!').code(400)
  }

};



export const postDestination = async (
  r: any,
  h: ResponseToolkit
): Promise<any> => {

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




    return await getClinicalSummary(appointment);
  }

  return message;

};


const getClinicalSummary = async (appointment: any) => await getAuthToken((token: string) => fetchRedoxClinicalSummary(token, appointment))
  


const getAuthToken = async (callback: any) => {
  if (authToken && Date.now() < new Date(authTokenExpires).getTime()) {
    return callback(authToken);
  } else {

    const redoxService = axios.create({
      timeout: 35000,
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const res = await redoxService({
      method: 'post',
      url: ' https://api.redoxengine.com/auth/authenticate',
      data: {
        apiKey: SOURCE_API_KEY,
        secret: SOURCE_SECERT
      }
    });

    const { accessToken, expires } = res.data;

    authToken = accessToken;
    authTokenExpires = expires;

    return callback(authToken);
  }
}


const fetchRedoxClinicalSummary = async (token: string, appointment: any) => {
  const redoxService = axios.create({
    timeout: 35000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });

  const res = await redoxService({
    method: 'post',
    url: ' https://api.redoxengine.com/query',
    data: {
      "Meta": {
        "DataModel": "Clinical Summary",
        "EventType": "PatientQuery",
        "EventDateTime": "2021-09-02T16:48:31.587Z",
        "Test": true,
        "Destinations": [
          {
            "ID": "ef9e7448-7f65-4432-aa96-059647e9b357",
            "Name": "Patient Query Endpoint"
          }
        ],
        "Logs": [
          {
            "ID": "d9f5d293-7110-461e-a875-3beb089e79f3",
            "AttemptID": "925d1617-2fe0-468c-a14c-f8c04b572c54"
          }
        ],
        "FacilityCode": null
      },
      "Patient": {
        "Identifiers": appointment.patientIdentifiers
      },
      "Location": {
        "Department": null
      }
    }
  });

  console.log('clinical summary', res.data)

  return res.data;
  
}