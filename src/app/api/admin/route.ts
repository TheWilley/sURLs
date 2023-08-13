import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import config from '@/config';

export async function DELETE(req: Request) {
    // Get the id from the query
    const url = new URL(req.url);
    const id = url.searchParams.get('id')?.trim();

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
    const id = url.searchParams.get('id')?.trim();

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
    const data = await req.json();
    const id = data.newID.trim();

    // If the id is too long, return an error
    if (data.newID && id.length > config.custom_id_length) {
        return NextResponse.json({
            message: `ID is too long (max ${config.custom_id_length} characters}`
        }, { status: 400 });
    // If the id contains invalid characters, return an error
    } else if (data.newID && !config.custom_id_regex.test(id)) {
        return NextResponse.json({
            message: 'ID contains invalid characters'
        }, { status: 400 });
    }

    // Get match from the database
    await prisma.urls.update({
        where: {
            shortenedURL: data.id!
        },
        data: {
            shortenedURL: data.newID!
        },
    }).catch(() => {
        return NextResponse.json({
            message: 'Could not update entry'
        }, { status: 500 });
    });

    return NextResponse.json({ message: 'Successfully updated entry' }, { status: 200 });
}