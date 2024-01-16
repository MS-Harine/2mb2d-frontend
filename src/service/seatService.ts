import axios from "axios";
import * as cheerio from 'cheerio';

const METHOD = "http";
const HOST = "songwonkim.shop";

const Axios = axios.create({
  baseURL: METHOD + "://" + HOST
})

export async function fetchUsers() {
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
