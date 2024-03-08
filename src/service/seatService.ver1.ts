import axios from "axios";

const METHOD = "http";
const HOST = "songwonkim.shop";

const Axios = axios.create({
  baseURL: METHOD + "://" + HOST + "/api"
});

export async function fetchUsers(): Promise<Array<string>> {
  const uri = '/seat';
  const response = await Axios.get(uri);
  return response.data.users;
}

export async function batchCurrent(): Promise<Array<string>> {
  return await fetchUsers();
}

export async function batchRandom(): Promise<Array<string>> {
  throw new Error('Not implemented');
}

export async function batchLeader(leaders: Array<string>): Promise<Array<string>> {
  throw new Error('Not implemented');
}

export async function confirmSeat(users: Array<string>, password: String): Promise<Array<string>> {
  throw new Error('Not implemented');
}