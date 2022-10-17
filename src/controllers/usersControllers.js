import { listUser, listUrlsUser } from "../repositories/usersRepository.js";

const readUser = async (req, res) => {
    const session = res.locals.session;

    try {
        const user = await listUser(session);

        const urlsUser = await listUrlsUser(session);

        const objUrlsUser = urlsUser?.rows.map(value => ({
                id: value.id,
                shortUrl: value.shortUrl,
                url: value.url,
                visitCount: value.visitCount
        }));

        const result = user?.rows.map(value => ({
            id: value.id,
            name: value.name,
            visitCount: Number(value.visitCount),
            shortenedUrls: [
                ...objUrlsUser
            ]            
        }));

        res.status(200).send(result[0]);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { readUser };