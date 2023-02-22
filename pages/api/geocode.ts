import type { NextApiRequest, NextApiResponse } from "next";
import * as NodeGeocoder from "node-geocoder";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.query.address === undefined) {
        res.status(400).json({ error: "address is required" });
    }

    const options: NodeGeocoder.Options = {
        provider: "google",
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
    };

    // @ts-ignore
    const geocoder = NodeGeocoder(options);

    const results = await geocoder.geocode(req.query.address);

    res.status(200).json(results);
};

export default handler;
