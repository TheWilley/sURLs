// app/api/upload
import { NextResponse } from 'next/server';
import { uid } from 'uid';
import prisma from '@/lib/prisma';
import config from '@/config';


async function getMatch(id: string) {
    const match = await prisma.urls.findFirst({
        where: {
            shortenedURL: id
        },
        select: {
            shortenedURL: true
        }
    });

    // If the match exists, return 
    if (match) {
        return true;
    } else {
        return false;
    }
}

async function useCustomID(id: string) {
    if (!await getMatch(id)) {
        return id;
    } else {
        return null;
    }
}

async function generateUniqueID() {
    let tokenIsUnique = false;
    let token = '';

    while (!tokenIsUnique) {
        token = uid(config.generated_id_length || 5);
        if (!await getMatch(token)) tokenIsUnique = true;
    }
    return token;
}

export async function POST(req: Request) {
    const data = await req.json();

    // Trim the url
    data.url = data.url.trim();

    // Check if the url is empty
    if (data.url === '') {
        return NextResponse.json({
            message: 'URL cannot be empty'
        }, { status: 400 });
    }

    // Check if data is a valid URL
    try {
        new URL(data.url);
    } catch (err) {
        return NextResponse.json({
            message: 'Invalid URL'
        }, { status: 400 });
    }

    // Check if the url is smaller than 20 characters
    if (data.url.length < 15) {
        return NextResponse.json({
            message: 'URL must be at least 15 characters long'
        }, { status: 400 });
    }

    // If the url is already in the database, return the object
    const match = await prisma.urls.findFirst({
        where: {
            url: data.url,
        },
        select: {
            url: true,
            shortenedURL: true
        }
    });

    if (match) {
        // Return the object
        return NextResponse.json({
            response: match,
            alreadyExists: true
        }, { status: 200 });
    }

    // Generate a unique ID
    // FIXME: React Hook "useCustomID" is called conditionally. This does not make any sense this this IS NOT A REACT HOOK!
    // eslint-disable-next-line
    const id = data.customID ? await useCustomID(data.customID) : await generateUniqueID();

    // If the id is null, return an error
    if (!id) {
        return NextResponse.json({
            message: 'ID already exists'
        }, { status: 500 });

    // If the id is too long, return an error
    } else if (data.customID && id.length > config.custom_id_length) {
        return NextResponse.json({
            message: `ID is too long (max ${config.custom_id_length} characters}`
        }, { status: 400 });
    } else if (data.customID && !config.custom_id_regex.test(id)) {
        return NextResponse.json({
            message: 'ID contains invalid characters'
        }, { status: 400 });
    }

    // Create a new object with the url and the id
    const urlObject = {
        url: data.url,
        shortenedURL: id
    };

    // Insert the object into the database
    try {
        // Insert using prisma
        await prisma.urls.create({
            data: urlObject
        });
    } catch (err) {
        return NextResponse.json({
            message: 'Could not insert the object into the database'
        }, { status: 500 });
    }

    // Return the object
    return NextResponse.json({
        response: urlObject,
        alreadyExists: false,
    }, { status: 200 });
}
