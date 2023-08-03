import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
    // Get the id from the query
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    // Create a client and connect to the database
    const client = await clientPromise;
    const db = client.db();

    // Find the url in the database
    const urls = await db.collection('urls').find({ 'shortenedURL': id }).toArray();

    // Check if the url exists
    if (urls.length > 0) {
        return NextResponse.json(urls[0], { status: 200 });
    } else {
        return NextResponse.json({
            message: 'Entry not found'
        }, { status: 404 });
    }
}