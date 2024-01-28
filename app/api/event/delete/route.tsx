import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

async function deleteEvent(eventData: {
    id: string;
}): Promise<void> {
    try {
        const deletedEvent = await prisma.event.delete({
            where: {
                id: eventData.id
            },
        });
        console.log("Deleted event: ", deletedEvent);
    } catch (error) {
        console.error("Error deleting event: ", error);
        throw error;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await deleteEvent(req.body);
        res.status(200).json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ error });
    }
};