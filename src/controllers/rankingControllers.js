import { listRankig } from "../repositories/rankingRepository.js";

const readRanking = async (req, res) => {
    try {
        const ranking = await listRankig();

        res.status(200).send(ranking);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { readRanking };