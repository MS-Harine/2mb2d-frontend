import axios from "axios";
import * as cheerio from 'cheerio';

const METHOD = "http";
const HOST = "songwonkim.shop";

const Axios = axios.create({
  baseURL: METHOD + "://" + HOST
});

export async function fetchUsers(): Promise<Array<string>> {
  const page = '/seat';
  const re = /(?:\d+). (\W+)/;

  const response = await Axios.get(page);
  const $ = cheerio.load(response.data);
  
  const result = $("pre").map((_, e) => {
    const regex = re.exec($(e).text());
    return regex ? regex[1] : "";
  });

  return result.toArray();
}

export async function batchRandom(): Promise<Array<string>> {
  const page = '/random';
  await Axios.get(page);

  return await fetchUsers();
}

export async function batchLeader(leaders: Array<string>): Promise<Array<string>> {
  const setLeaderPage = '/setting';
  await Axios.post(setLeaderPage, JSON.stringify(leaders), {
    headers: {
      "Content-Type": 'application/json'
    }
  });

  const leaderPage = '/leader';
  await Axios.get(leaderPage);

  return await fetchUsers();
}

export async function confirmSeat(users?: Array<string>, password?: string): Promise<Array<string>> {
  const page = '/confirm';
  await Axios.get(page);

  return await fetchUsers();
}