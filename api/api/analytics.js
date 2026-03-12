import { kv } from '@vercel/kv';
export default async function handler(req, res) {
    const allLinks = await kv.lrange('all_links', 0, -1);
    return res.status(200).json(allLinks || []);
}
