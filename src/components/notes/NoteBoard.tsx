'use client'

import { useEffect, useRef } from "react";
import YouTubeController from "./YouTubeController"
import NoteList from "./NoteList";
import NoteController from "./NoteController";
import { CircleQuestionMark, MenuIcon } from 'lucide-react';

type Props = Readonly<{
    videoId: string;
}>

export default function NoteBoard({ videoId }: Props) {
    const playerRef = useRef<YT.Player | null>(null);

    // Các nút điều khiển
    const play = () => playerRef.current?.playVideo();
    const pause = () => playerRef.current?.pauseVideo();
    const stop = () => playerRef.current?.stopVideo();

    const forward = () => {
        const t = playerRef.current?.getCurrentTime() || 0;
        playerRef.current?.seekTo(t + 5, true);
    };
    const backward = () => {
        const t = playerRef.current?.getCurrentTime() || 0;
        playerRef.current?.seekTo(Math.max(t - 5, 0), true);
    };
    const goToTime = () => {
        playerRef.current?.seekTo(20, true);
    }

    // Danh sách mốc thời gian (giây)
    const checkpoints = [20, 40, 100];
    // Dùng Set để tránh log nhiều lần cho cùng một mốc
    const triggered = useRef<Set<number>>(new Set());

    useEffect(() => {
        const interval = setInterval(() => {
            const player = playerRef.current;
            if (!player) return;

            const current = Math.floor(player.getCurrentTime()); // giây hiện tại
            checkpoints.forEach((time) => {
                if (current >= time && !triggered.current.has(time)) {
                    console.log(`📌 Đã đạt mốc ${time}s`);
                    triggered.current.add(time);
                }
            });
        }, 500); // kiểm tra mỗi 0.5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen">
            {/* header */}
            <div className="p-2 flex justify-between">
                <button className="flex justify-center items-center border-none bg-white"><MenuIcon size={24} /></button>

                <div className="flex gap-3">
                    <button className="flex gap-2 items-center px-3 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-300 sm:text-sm">
                        <CircleQuestionMark />
                        <span>Tutorial</span>
                    </button>
                    <button className="px-3 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-300 sm:text-sm">Save</button>
                </div>
            </div>

            {/* left side */}
            <div className="fixed top-0 -left-[140px] bottom-0 w-xs bg-blue-300 overflow-y-auto md:left-0 ">
                <NoteList />
            </div>

            <div className="pl-[320px] h-full">
                <div className="h-7/12 bg-black">
                    <div className="bg-black h-full w-auto">
                        <YouTubeController ref={playerRef} videoId={videoId} />
                    </div>
                </div>
                {/* Controls */}
                <NoteController />
                {/* {videoId && (
                    <div className="flex flex-wrap gap-2">
                        <button onClick={play} className="px-4 py-2 bg-green-500 text-white rounded-lg">Play</button>
                        <button onClick={pause} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Pause</button>
                        <button onClick={stop} className="px-4 py-2 bg-red-500 text-white rounded-lg">Stop</button>
                        <button onClick={backward} className="px-4 py-2 bg-gray-600 text-white rounded-lg">⏪ -5s</button>
                        <button onClick={forward} className="px-4 py-2 bg-gray-600 text-white rounded-lg">⏩ +5s</button>
                        <button onClick={goToTime} className="px-4 py-2 bg-gray-600 text-white rounded-lg">⏩ go to 20s</button>
                    </div>
                )} */}
            </div>
        </div>
    )
}
