import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Appointment {
  'id' : bigint,
  'doctorUsername' : string,
  'patientUsername' : string,
  'timestamp' : bigint,
  'attachment' : [] | [Uint8Array | number[]],
  'condition' : string,
}
export interface Report {
  'id' : bigint,
  'media' : [] | [Uint8Array | number[]],
  'content' : string,
  'doctorUsername' : string,
  'patientUsername' : string,
  'timestamp' : bigint,
  'principalId' : UserId,
}
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Result_1 = { 'ok' : UserId } |
  { 'err' : string };
export interface User {
  'id' : UserId,
  'verified' : boolean,
  'username' : string,
  'dateOfBirth' : [] | [string],
  'name' : [] | [string],
  'role' : UserRole,
  'email' : [] | [string],
  'gender' : [] | [string],
  'licenseNumber' : [] | [string],
  'image' : [] | [Uint8Array | number[]],
}
export type UserId = bigint;
export type UserRole = { 'Doctor' : null } |
  { 'Admin' : null } |
  { 'Patient' : null };
export interface _SERVICE {
  'addPatientImage' : ActorMethod<[string, Uint8Array | number[]], boolean>,
  'addUser' : ActorMethod<
    [
      string,
      UserRole,
      [] | [string],
      [] | [string],
      [] | [string],
      [] | [string],
      [] | [string],
      [] | [Uint8Array | number[]],
    ],
    Result_1
  >,
  'createAppointment' : ActorMethod<
    [string, string, string, [] | [Uint8Array | number[]]],
    Result
  >,
  'createReport' : ActorMethod<
    [string, string, string, [] | [Uint8Array | number[]]],
    Result
  >,
  'getAppointments' : ActorMethod<[string], Array<Appointment>>,
  'getReport' : ActorMethod<[string, bigint], [] | [Report]>,
  'getVerifiedDoctors' : ActorMethod<[], Array<User>>,
  'greetAuthenticated' : ActorMethod<[Principal], string>,
  'registerPatient' : ActorMethod<[string], Result_1>,
  'sendMessage' : ActorMethod<
    [string, string, string, [] | [Uint8Array | number[]], [] | [string]],
    Result
  >,
  'verifyDoctor' : ActorMethod<[string], boolean>,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
