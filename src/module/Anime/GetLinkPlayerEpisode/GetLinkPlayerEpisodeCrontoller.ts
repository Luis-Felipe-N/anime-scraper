import { Request, Response } from "express";

class GetLinkPlayerEpisodeController {
    async handle(request: Request, response: Response) {
        const { episodeId } = request.params
        const linkPlayerService = new GetLinkPlayerEpisodeService()

        const link = linkPlayerService.execute(episodeId)

        
    }
}