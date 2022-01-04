import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import { AppDetails, Data, SteamAppsType } from './fetch.types';
import {sleep} from "../../../utils/sleep";

async function get(url: string) {
  for (let i = 0; i < 3; i++) {
    try {
      await sleep(3000);
      // return undefined;
      const data = (await axios.get(url)).data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      console.log(url, error.response?.status);
      if (error.response?.status === 403) {
        await sleep(1000);
      } else {
        return undefined;
      }
    }
  }
  return null;
}

async function toFile(filename: string, url: string) {
  const data = await get(url);
  fs.writeFileSync(filename, JSON.stringify(data));
  return data;
}
async function fromFile(filename: string) {
  return JSON.parse(fs.readFileSync(filename).toString());
}

export async function getapp(id: number): Promise<Data | undefined> {
  const app: any = await get(`https://store.steampowered.com/api/appdetails?appids=${id}&cc=gb&l=en`);
  if (app !== null) {
    for (const key in app) {
      const appdetail: AppDetails = app[key];
      return appdetail.data;
    }
  } else {
    return undefined;
  }
}

export async function getapps(): Promise<SteamAppsType> {
  const link = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json';
  //return await get(link);
  //debug stuff
  const file_name = 'games.json';
  if (fs.existsSync(file_name)) {
    return await fromFile(file_name);
  } else {
    return await toFile(file_name, link);
  }
}
