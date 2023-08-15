'use client';
import axios from 'axios';
import { useState } from 'react';
import Loader from '@/components/Loader';
import Message from '@/components/Message';

type ShortenedURLObject = {
    success: boolean, alreadyExists: boolean,
    response: {
        url: string,
        shortenedURL: string,
    }
};

function handleLongString(string: string) {
    if (string.length > 150) {
        return string.substring(0, 50) + '...';
    } else {
        return string;
    }
}

function ShortenedURL(props: { shortenedURLObject: ShortenedURLObject | null }) {
    if (props.shortenedURLObject?.response) {
        return (
            <div className="mt-4 p-2 bg-white shadow-md rounded-md">
                <div className='w-full'>
                    <p className="text-center text-gray-700 font-bold">Original URL:</p>
                    <div className="block text-center text-blue-500 font-bold break-all p-2"><a href={props.shortenedURLObject.response.url} target="_blank" rel="noopener noreferrer"> {handleLongString(props.shortenedURLObject.response.url)} </a></div>
                </div>
                <div>
                    <hr className="my-2" />
                    <p className="text-center text-gray-700 font-bold">Shortened URL:</p>
                    <div className="block text-center text-blue-500 font-bold break-all p-2"><a href={`/r/${props.shortenedURLObject.response.shortenedURL}`} target="_blank" rel="noopener noreferrer"> {`${window.location.host}/r/${props.shortenedURLObject.response.shortenedURL}`}</a></div>
                </div>
            </div>
        );
    }
}

function UploadComponent() {
    // States
    const [shortenedURLObject, setShortenedURLObject] = useState<ShortenedURLObject | null>(null);
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [customID, setCustomID] = useState('');
    const [customIDEnabled, setCustomIDEnabled] = useState(false);

    /**
     * Handles form submit
     * @param event The event when the form is submitted
     */
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Set loading to true
        setLoading(true);

        // Send upload request
        axios.post('/api/upload', {
            url: event.target[0].value,
            customID: customIDEnabled ? event.target[1].value : null,
        }).then((response) => {
            setShortenedURLObject({ ...response.data });
            if({...response.data}.alreadyExists) {
                setMessage('This URL has already been shortened');
            }
            setError('');
            setLoading(false);
        }).catch((error) => {
            setError(error.response.data.message);
            setShortenedURLObject(null);
            setLoading(false);
        });
    };

    return (
        <>
            <h1 className='text-6xl text-center m-5 font-bold'> sURLs </h1>
            <div className='bg-white shadow-md rounded-md p-6 mb-4 flex w-full justify-center'>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={customIDEnabled}
                        onChange={() => setCustomIDEnabled(!customIDEnabled)}
                        className="form-checkbox border border-gray-400 p-2 rounded-md"
                    />
                    <span className="ml-2">Use custom ID</span>
                </label>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 flex w-full justify-center h-24">
                    <div className='flex space-x-2'>
                        <div>
                            <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" id="url" name="url" placeholder="Enter a URL" className="border border-gray-400 p-2 w-full h-full rounded-md" required />
                        </div>
                        {customIDEnabled && (
                            <div>
                                <input value={customID} onChange={(e) => setCustomID(e.target.value)} type="text" id="customID" name="customID" placeholder="Custom ID" className="border border-gray-400 p-2 w-full h-full rounded-md" required />
                            </div>
                        )}
                        <div className='text-center'>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-36 h-full">
                                {loading ? <Loader /> : 'Shorten'}
                            </button>
                        </div>
                    </div>
                </form>


            </div>
            <div>
                <ShortenedURL shortenedURLObject={shortenedURLObject}/>
                <Message error={error} message={message}/>
            </div>
        </>
    );
}

export default UploadComponent; 