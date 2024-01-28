import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: { json: () => any; }) => {
    const body = await request.json();
    try {
        const newEvent = await prisma.event.create({
            data: {
                name: body.eventName,
                description: body.eventDescription,
                image_url: body.eventImageUrl,
                date: new Date(body.eventDate)
            },
        });
        return new Response(JSON.stringify(newEvent), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}