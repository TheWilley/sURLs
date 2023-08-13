import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    // Get the id from the query
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    // Get match from the database
    const match = await prisma.urls.findFirst({
        where: {
            OR: [
                { shortenedURL: id! },
                { url: id! }
            ]
        },
        select: {
            url: true,
            shortenedURL: true
        }
    });

    // Check if the url exists
    if (match) {
        return NextResponse.json(match, { status: 200 });
    } else {
        return NextResponse.json({
            message: 'Entry not found'
        }, { status: 404 });
    }
}