import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
    // Get the id from the query
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    // Get match from the database
    await prisma.urls.delete({
        where: {
            shortenedURL: id!
        },
        select: {
            url: true,
            shortenedURL: true
        }
    }).catch(() => {
        return NextResponse.json({
            message: 'Could not delete entry'
        }, { status: 500 });
    });

    // Check if the url exists
    return NextResponse.json({message: 'Successfully deleted entry'}, { status: 200 });
}