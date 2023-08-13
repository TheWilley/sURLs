function Message(props: { message: string, error: string }) {
    return (
        <>
            {props.message && <p className="text-center text-green-500 font-bold mt-4">{props.message}</p>}
            {props.error && <p className="text-center text-red-500 font-bold mt-4">{props.error}</p>}
        </>
    );
}

export default Message;