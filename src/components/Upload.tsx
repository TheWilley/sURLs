'use client';
import axios from 'axios';
import { useState } from 'react';

type ShortenedURLObject = {
    success: boolean, alreadyExists: boolean,
    response: {
        url: string,
        shortenedURL: string,
    }
};

function Upload() {
    const [shortenedURLObject, setShortenedURLObject] = useState<ShortenedURLObject | null>(null);
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.post('/api/upload', {
            url: event.target[0].value
        }).then((response) => {
            setShortenedURLObject({ ...response.data });
            setError('');
        }).catch((error) => {
            setError(error.response.data.message);
            setShortenedURLObject(null);
        });
    };

    const ShortenedURL = () => {
        if (shortenedURLObject?.response) {
            return (
                <div className="mt-4 p-2 bg-white shadow-md rounded-md">
                    <p className="text-center text-gray-700 font-bold">Original URL:</p>
                    <a href={shortenedURLObject.response.url} target="_blank" rel="noopener noreferrer" className="block text-center text-blue-500 font-bold">{shortenedURLObject.response.url}</a>
                    <hr className="my-2" />
                    <p className="text-center text-gray-700 font-bold">Shortened URL:</p>
                    <a href={`${process.env.BASE_URL}/r/${shortenedURLObject.response.shortenedURL}`} target="_blank" rel="noopener noreferrer" className="block text-center text-blue-500 font-bold">{`${process.env.BASE_URL}/r/${shortenedURLObject.response.shortenedURL}`}</a>
                </div>
            );
        }
    };

    return (
        <div>
            <div className=''>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 flex w-full justify-center">
                    <div className='flex space-x-2'>
                        <div>
                            <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" id="url" name="url" placeholder="Enter a URL" className="border border-gray-400 p-2 w-full rounded-md" required />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Shorten</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <ShortenedURL />
                {error && <p className="text-center text-red-500 font-bold mt-4">{error}</p>}
            </div>
        </div>
    );
}

export default Upload; 