import { kv } from '@vercel/kv';
export default async function handler(req, res) {
    const { original_url } = req.body;
    const short_code = Math.random().toString(36).substring(2, 8);
    const linkData = { short_code, original_url, clicks: 0, created_at: new Date().toISOString() };
    await kv.set(`link:${short_code}`, linkData);
    await kv.lpush('all_links', linkData);
    return res.status(200).json({ short_code, short_url: `https://${req.headers.host}/${short_code}` });
}
