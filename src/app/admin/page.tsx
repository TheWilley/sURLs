'use client';
import Loader from '@/components/Loader';
import axios from 'axios';
import { useState } from 'react';
import Message from '@/components/Message';
import React from 'react';

type ShortenedURLObject = {
    success: boolean, alreadyExists: boolean,
    url: string,
    shortenedURL: string,
}

function Form(props: { shortenedURLObject: ShortenedURLObject | null, setMessage: React.Dispatch<React.SetStateAction<string>>, setError: React.Dispatch<React.SetStateAction<string>>, setShortenedURLObject: React.Dispatch<React.SetStateAction<ShortenedURLObject | null>> }) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [newID, setNewID] = useState('');

    const handleDelete = (event: any) => {
        event.preventDefault();

        // Set loading to true
        setDeleteLoading(true);

        axios.delete(`/api/admin?id=${props.shortenedURLObject?.shortenedURL}`)
            .then((response) => {
                props.setError('');
                props.setMessage(response.data.message);
                props.setShortenedURLObject(null);
                setDeleteLoading(false);
            }
            ).catch((error) => {
                props.setError(error.response.data.message);
                props.setMessage('');
                setDeleteLoading(false);
            });
    };

    const handleUpdate = (event: any) => {
        event.preventDefault();

        // Set loading to true
        setUpdateLoading(true);

        axios.put('/api/admin', {
            id: props.shortenedURLObject?.shortenedURL,
            newID: newID
        }).then((response) => {
            props.setError('');
            props.setMessage(response.data.message);
            props.setShortenedURLObject(null);
            setUpdateLoading(false);
        }).catch((error) => {
            props.setError(error.response.data.message);
            props.setMessage('');
            setUpdateLoading(false);
        });
    };

    return (
        <div className="mt-4 p-2 bg-white shadow-md rounded-md">
            <input type="text" id="newID" name="newID" placeholder="Enter a ID" className="border border-gray-400 p-2 w-full mt-2 rounded-md" value={newID} onChange={e => setNewID(e.target.value)} />
            <div className='flex justify-center'>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-full m-2' onClick={handleUpdate}> {updateLoading ? <Loader /> : 'Save Changes'} </button>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full m-2' onClick={handleDelete}> {deleteLoading ? <Loader /> : 'Delete'} </button>
            </div>
        </div>
    );
}

function ShortenedURL(props: { shortenedURLObject: ShortenedURLObject | null, setMessage: React.Dispatch<React.SetStateAction<string>>, setError: React.Dispatch<React.SetStateAction<string>>, setShortenedURLObject: React.Dispatch<React.SetStateAction<ShortenedURLObject | null>> }) {
    if (props.shortenedURLObject) {
        return (
            <>
                <div className="mt-4 p-2 bg-white shadow-md rounded-md">
                    <table className="table-auto border-collapse border border-gray-100 w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-400">Original URL</th>
                                <th className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-400">Shortened URL</th>
                                <th className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-400">ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border border-gray-400 w-1/3">
                                    <a href={`${props.shortenedURLObject.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                        {`${props.shortenedURLObject.url}`}
                                    </a>
                                </td>
                                <td className="px-4 py-2 border border-gray-400 w-1/3">
                                    <a href={`/r/${props.shortenedURLObject.shortenedURL}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                        {`${window.location.host}/r/${props.shortenedURLObject.shortenedURL}`}
                                    </a>
                                </td>
                                <td className="px-4 py-2 border border-gray-400 w-1/3">
                                    <p rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                        {`${props.shortenedURLObject.shortenedURL}`}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Form shortenedURLObject={props.shortenedURLObject} setError={props.setError} setMessage={props.setMessage} setShortenedURLObject={props.setShortenedURLObject} />
            </>
        );
    }
}

export default function Admin() {
    const [URLorID, setURLorID] = useState('');
    const [fetchLoading, setFetchLoading] = useState(false);
    const [shortenedURLObject, setShortenedURLObject] = useState<ShortenedURLObject | null>(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Set loading to true
        setFetchLoading(true);

        axios.get(`/api/admin?id=${URLorID}`, {
        }).then((response) => {
            setShortenedURLObject({ ...response.data });
            setError('');
            setMessage('');
            setFetchLoading(false);
        }).catch((error) => {
            setShortenedURLObject(null);
            setError(error.response.data.message);
            setMessage('');
            setFetchLoading(false);
        });
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
                            {fetchLoading ? <Loader /> : 'Fetch'}
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <ShortenedURL shortenedURLObject={shortenedURLObject} setError={setError} setMessage={setMessage} setShortenedURLObject={setShortenedURLObject} />
                <Message message={message} error={error} />
            </div>
        </>
    );
}