import Image from 'next/image';
import loader from '../assets/loader.svg';

function Loader() {
    return (
        <Image 
        src={loader} 
        width={0}
        height={0}
        alt='Loader' className='w-full h-full' />
    );
}

export default Loader;