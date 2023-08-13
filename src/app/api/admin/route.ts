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

    return NextResponse.json({ message: 'Successfully deleted entry' }, { status: 200 });
}

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

export async function PUT(req: Request) {
    // Get the id from the query
    const url = new URL(req.url);
    const fullURL = url.searchParams.get('fullURL');
    const shortenedURL = url.searchParams.get('shortenedURL');

    // Check which one is defined and update accordingly
    if (shortenedURL && !fullURL) {
        // Get match from the database
        await prisma.urls.update({
            where: {
                shortenedURL: shortenedURL!
            },
            data: {
                shortenedURL: shortenedURL!
            },
        }).catch(() => {
            return NextResponse.json({
                message: 'Could not update entry'
            }, { status: 500 });
        });
    } else if (fullURL && !shortenedURL) {
        // Get match from the database
        await prisma.urls.update({
            where: {
                url: fullURL!
            },
            data: {
                url: fullURL!,
            },
        }).catch(() => {
            return NextResponse.json({
                message: 'Could not update entry'
            }, { status: 500 });
        });
    }

    return NextResponse.json({ message: 'Successfully updated entry' }, { status: 200 });

}