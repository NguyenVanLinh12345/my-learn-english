'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function StartedAnnotating() {
    const navigation = useRouter();
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=BAuUlLD_vFM'); // test value

    const handleStartAnnotating = () => {
        const match = videoUrl.match(/v=([a-zA-Z0-9_-]{11})/);
        if (match) {
            navigation.push(`/notes/${match[1]}`);
        } else {
            console.log("Không tìm thấy videoId trong iframe!");
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <div className='flex justify-center items-center'>
                <div>
                    <h2 className='uppercase text-2xl font-bold'>
                        <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">Tăng cường</span>
                        {' '}khả năng{' '}
                        <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">ghi nhớ</span>
                        {' '}và{' '}
                        <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">sử dụng</span>
                        {' '}ngoại ngữ bằng youtube
                    </h2>
                    <p className='text-sm'>Dán link bạn vừa sao chép vào đây</p>

                    <div className="mt-1 flex flex-col rounded-md shadow-sm md:flex-row">
                        <div className="flex items-stretch flex-grow">
                            <label className="absolute -top-96 -left-96" htmlFor="url">Url</label>
                            <input
                                id="url"
                                type="text"
                                name="url"
                                placeholder="Paste a YouTube link"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="bg-gray-50 focus:ring-primary focus:border-primary block w-full rounded-none rounded-l-md rounded-r-md pl-10 py-3 items-center text-lg border-gray-300 md:rounded-r-none"
                            />
                        </div>
                        <button
                            onClick={handleStartAnnotating}
                            className="mt-3 -ml-px text-white bg-indigo-500 border border-gray-300 text-lg font-medium rounded-l-md rounded-r-md clickable-opacity focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary md:rounded-l-none md:block md:mt-0">
                            <span>Start annotating!</span>
                        </button>
                    </div>

                    <Link className='mt-5 text-lg underline text-sky-400 cursor-pointer' href={'/notes'}>Use example video</Link>
                </div>
            </div>
            <div className='flex justify-center'>
                <Image height={600} width={600} src={'/hero.webp'} alt='main introduce' />
            </div>
        </div>

    )
}
