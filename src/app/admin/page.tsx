'use client';
import axios from 'axios';
import { useState } from 'react';
import loader from '../../assets/loader.svg';
import Image from 'next/image';

type ShortenedURLObject = {
    success: boolean, alreadyExists: boolean,
    url: string,
    shortenedURL: string,
}

export default function Admin() {
    const [URLorID, setURLorID] = useState('');
    const [fetchLoading, setFetchLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [shortenedURLObject, setShortenedURLObject] = useState<ShortenedURLObject | null>(null);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Set loading to true
        setFetchLoading(true);

        axios.get(`/api/fetch-admin?id=${URLorID}`, {
        }).then((response) => {
            setShortenedURLObject({ ...response.data });
            setError('');
            setMessage('');
            setFetchLoading(false);
        }).catch((error) => {
            setError(error.response.data.message);
            setShortenedURLObject(null);
            setMessage('');
            setFetchLoading(false);
        });
    };

    const handleDelete = (event: any) => {
        event.preventDefault();

        // Set loading to true
        setDeleteLoading(true);

        axios.delete(`/api/delete-admin?id=${shortenedURLObject?.shortenedURL}`)
            .then((response) => {
                setError('');
                setMessage(response.data.message);
                setShortenedURLObject(null);
                setDeleteLoading(false);
            }
            ).catch((error) => {
                setError(error.response.data.message);
                setMessage('');
                setDeleteLoading(false);
            });
    };

    const ShortenedURL = () => {
        if (shortenedURLObject) {
            return (
                <>
                    <div className="mt-4 p-2 bg-white shadow-md rounded-md">
                        <div className='w-full'>
                            <p className="text-center text-gray-700 font-bold">Original URL:</p>
                            <div className="block text-center text-blue-500 font-bold break-all p-2"><input type='text' value={shortenedURLObject.url} className='text-center w-full border rounded p-2' rel="noopener noreferrer" /></div>
                        </div>
                        <div>
                            <hr className="my-2" />
                            <p className="text-center text-gray-700 font-bold">Shortened URL:</p>
                            <div className="block text-center text-blue-500 font-bold break-all p-2"><input type='text' value={shortenedURLObject.shortenedURL} className='text-center w-full border rounded p-2' rel="noopener noreferrer" /></div>
                        </div>
                    </div>
                    <div className="mt-4 p-2 bg-white shadow-md rounded-md">
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-full m-2'> {updateLoading ? <Image src={loader} width={25} height={25} alt='Loader' className='w-full h-full' /> : 'Save Changes'} </button>
                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full m-2' onClick={handleDelete}> {deleteLoading ? <Image src={loader} width={25} height={25} alt='Loader' className='w-full h-full' /> : 'Delete'} </button>
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <h1 className='text-6xl text-center m-5 font-bold'> sURLs Admin </h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 flex w-full justify-center">
                <div className='flex space-x-2'>
                    <div>
                        <input value={URLorID} onChange={(e) => setURLorID(e.target.value)} type="text" id="urlorid" name="urlorid" placeholder="Enter a URL or ID" className="border border-gray-400 p-2 w-full rounded-md" required />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            {fetchLoading ? <Image src={loader} width={25} height={25} alt='Loader' className='w-full h-full' /> : 'Fetch'}
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <ShortenedURL />
                {message && <p className="text-center text-green-500 font-bold mt-4">{message}</p>}
                {error && <p className="text-center text-red-500 font-bold mt-4">{error}</p>}
            </div>
        </>
    );
}