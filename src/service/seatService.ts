import * as v0 from './seatService.ver0';
import * as v1 from './seatService.ver1';

const APIVER = {
  VER_0: 0,
  VER_1: 1
} as const;
export type APIVER = typeof APIVER[keyof typeof APIVER];

function findAPI(apiver: APIVER) {
  let api;
  switch (apiver) {
  case APIVER.VER_0:
    api = v0;
    break;
  case APIVER.VER_1:
    api = v1;
    break;
  }

  return api;
}

export async function fetchUsers({ apiver = APIVER.VER_1 } : { apiver?: APIVER }): Promise<Array<string>> {
  return await findAPI(apiver).fetchUsers();
}

export async function batchRandom({ apiver = APIVER.VER_0 } : { apiver?: APIVER }): Promise<Array<string>> {
  return await findAPI(apiver).batchRandom();
}

export async function batchLeader({ 
  leaders,
  apiver = APIVER.VER_0
} : { 
  leaders: Array<string>,
  apiver?: APIVER 
}): Promise<Array<string>> {
  return await findAPI(apiver).batchLeader(leaders);
}

export async function confirmSeat({
  users = [],
  password = "",
  apiver = APIVER.VER_0
} : {
  users: Array<string>,
  password: string,
  apiver?: APIVER
}): Promise<Array<string>> {
  return await findAPI(apiver).confirmSeat(users, password);
}