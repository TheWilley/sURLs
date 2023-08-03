// app/api/upload
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

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

    // Create a client and connect to the database
    const client = await clientPromise;
    const db = client.db();

    // First check if the url is already in the database
    const matches = await db.collection('urls').find({ 'url': data.url }).toArray();

    if (matches.length !== 0) {
        // Return the object
        return NextResponse.json({
            response: matches[0],
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
        db.collection('urls').insertOne(urlObject);
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
