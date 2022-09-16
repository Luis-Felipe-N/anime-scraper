import axios from 'axios';
import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

export async function fetchOrCache(url: string, ignoreCache = false): Promise<string | undefined> {
  if (!existsSync('.cache')) {
    mkdirSync('.cache');
  }
  // console.log(`Getting data for ${url}...`);
  if (
    !ignoreCache &&
    existsSync(
      `.cache/${Buffer.from(url).toString('base64')}.html`,
    )
  ) {
    // console.log(`I read ${url} from cache`);
    const HTMLData = await readFile(
      `.cache/${Buffer.from(url).toString('base64')}.html`,
      { encoding: 'utf8' },
    );
    return HTMLData;
  } else {
    try {
      const { data: HTMLData} = await axios.get(url);
      if (!ignoreCache && HTMLData) {
        writeFile(
          `.cache/${Buffer.from(url).toString('base64')}.html`,
          HTMLData,
          { encoding: 'utf8' },
        );
      }
      return HTMLData;
    } catch (error) {
      return 
    }
  }
}