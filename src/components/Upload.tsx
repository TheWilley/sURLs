'use client';
import axios from 'axios';
import { useState } from 'react';
import loader from '../assets/loader.svg';
import Image from 'next/image';

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
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Set loading to true
        setLoading(true);

        axios.post('/api/upload', {
            url: event.target[0].value
        }).then((response) => {
            setShortenedURLObject({ ...response.data });
            setError('');
            setLoading(false);
        }).catch((error) => {
            setError(error.response.data.message);
            setShortenedURLObject(null);
            setLoading(false);
        });
    };

    const ShortenedURL = () => {
        if (shortenedURLObject?.response) {
            return (
                <div className="mt-4 p-2 bg-white shadow-md rounded-md">
                    <div className='w-full'>
                        <p className="text-center text-gray-700 font-bold">Original URL:</p>
                        <div className="block text-center text-blue-500 font-bold break-all p-2"><a href={shortenedURLObject.response.url} target="_blank" rel="noopener noreferrer"> {shortenedURLObject.response.url} </a></div>
                    </div>
                    <div>
                        <hr className="my-2" />
                        <p className="text-center text-gray-700 font-bold">Shortened URL:</p>
                        <div className="block text-center text-blue-500 font-bold break-all p-2"><a href={`${process.env.BASE_URL}/r/${shortenedURLObject.response.shortenedURL}`} target="_blank" rel="noopener noreferrer"> {`${process.env.BASE_URL}/r/${shortenedURLObject.response.shortenedURL}`}</a></div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className='max-w-md'>
            <div>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 flex w-full justify-center">
                    <div className='flex space-x-2'>
                        <div>
                            <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" id="url" name="url" placeholder="Enter a URL" className="border border-gray-400 p-2 w-full rounded-md" required />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                                {loading ? <Image src={loader} width={25} height={25} alt='Loader' className='w-full h-full' /> : 'Shorten'}
                            </button>
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