import { kv } from '@vercel/kv';
export default async function handler(req, res) {
    const { code } = req.query;
    const linkData = await kv.get(`link:${code}`);
    if (linkData) {
        linkData.clicks += 1;
        await kv.set(`link:${code}`, linkData);
        return res.redirect(301, linkData.original_url);
    }
    return res.status(404).send('Not Found');
}
