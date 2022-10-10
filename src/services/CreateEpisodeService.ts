require('dotenv').config();
import axios from "axios";
import path from "path";
import fs from 'fs'
import { AppDataSource } from "../database/dataSource";
import { Episode, Season } from "../entities";

interface IEpisodeRequest {
    season_id: string; 
    // id: string; 
    title: string; 
    image: string; 
    uploaded_at: Date; 
    linkPlayer: string; 
    linkEmbed: string; 
    duration: number; 
    season: Season;
}


export class CreateEpisodeService {
    async execute(episodes: Episode[]) {
        const repoEpisode = AppDataSource.getRepository(Episode)

        try {
            const episodesCreated = await repoEpisode.save(episodes)
            
            return episodesCreated
        } catch (error) {
            return new Error(error.message)
        }
    }

    async downloadFile(fileUrl: string, downloadFolder: string, name: string): Promise<void> {
        const fileName = path.basename(name + '.mp4');
        const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
        try {
          const response = await axios({
            method: 'GET',
            url: fileUrl,
            responseType: 'stream',
          });
      
          const w = response.data.pipe(fs.createWriteStream(localFilePath));
          w.on('finish', () => {
            console.log('Successfully downloaded file!');
          });
        } catch (err) { 
          throw new Error(err);
        }
    }; 
}
