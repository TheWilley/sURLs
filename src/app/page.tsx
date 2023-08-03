'use client';
import Upload from '@/components/Upload';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <main>
        <h1 className='text-6xl text-center m-5 font-bold'> sURLs </h1>
        <Upload />
      </main>
    </div>
  );
}
