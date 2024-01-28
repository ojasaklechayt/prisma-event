import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

// async function deleteEvent(eventData: {
//     id: string;
// }): Promise<void> {
//     try {
//         const deletedEvent = await prisma.event.delete({
//             where: {
//                 id: eventData.id
//             },
//         });
//         console.log("Deleted event: ", deletedEvent);
//     } catch (error) {
//         console.error("Error deleting event: ", error);
//         throw error;
//     }
// }

async function editEvent(eventData: { 
    id: string;
    name: string;
    description: string;
    image_url: string;
    date: Date;
}): Promise<void> {
    try {
        const editedEVent = await prisma.event.update({
            where: {
                id: eventData.id
            },
            data:{
                name: eventData.name,
                description: eventData.description,
                image_url: eventData.image_url,
                date: eventData.date
            }
        })
        console.log("Edited event: ", editedEVent);
    } catch (error) {
        console.error("Error editing event: ", error);
        throw error;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await editEvent(req.body);
        res.status(200).json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ error });
    }
};