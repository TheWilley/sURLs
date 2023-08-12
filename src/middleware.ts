import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/')[2];

    if (id) {
        // Create a client and connect to the database
        const base = req.nextUrl.clone().origin;
        const url = `${base}/api/fetch?id=${id}`;

        // Check if the url exists and is not a next.js file
        if (url && !url.includes('_next')) {
            // Fetch the url from the database
            // We return the fetch statement to run the NextResponse.redirect() statement
            return fetch(url.toString())
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .then((data) => {
                    return NextResponse.redirect(data.url);
                })
                .catch(() => {
                    const url = req.nextUrl.clone();
                    url.pathname = '/';
                    return NextResponse.redirect(url);
                });
        } else {
            return NextResponse.next();
        }
    }
}

export const config = {
    matcher: '/r/:path*'
};