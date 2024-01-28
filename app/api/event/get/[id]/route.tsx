import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async ({ params }: {
    params: { id: string }
}) => {
    try {
        const getEvent = await prisma.event.findUnique({
            where: {
                id: params.id
            }
        });
        return new Response(JSON.stringify(getEvent), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}