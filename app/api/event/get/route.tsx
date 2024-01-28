import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async() => {
    try {
        const getEvent = await prisma.event.findMany();
        return new Response(JSON.stringify(getEvent), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}