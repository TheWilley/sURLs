// app/api/upload
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

async function generateUniqueID() {
    const buffer = crypto.randomBytes(3);
    const token = buffer.toString('hex');
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
    let id = await generateUniqueID();

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
        alreadyExists: false
    }, { status: 200 });
}
