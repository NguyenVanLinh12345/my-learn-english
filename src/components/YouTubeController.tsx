"use client";

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

type Props = {
    videoId: string;
}
export default function YouTubeController({ videoId }: Props) {
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load YouTube API script
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }
    }, []);

    // Tạo player khi có videoId
    useEffect(() => {
        if (!videoId || !containerRef.current) return;

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                events: {
                    onReady: () => console.log("Player ready!"),
                },
            });
        };

        // Nếu API đã sẵn sàng
        if (window.YT && window.YT.Player) {
            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                events: {
                    onReady: () => console.log("Player ready!"),
                },
            });
        }
    }, [videoId]);

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

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4">
            <h1 className="text-xl font-bold">YouTube Controller</h1>
            {/* Video */}
            <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div id="player" ref={containerRef} className="w-full h-full">
                    <iframe width="560" height="315"
                        title="YouTube video player"
                        src=""
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </div>

            {/* Controls */}
            {videoId && (
                <div className="flex flex-wrap gap-2">
                    <button onClick={play} className="px-4 py-2 bg-green-500 text-white rounded-lg">Play</button>
                    <button onClick={pause} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Pause</button>
                    <button onClick={stop} className="px-4 py-2 bg-red-500 text-white rounded-lg">Stop</button>
                    <button onClick={backward} className="px-4 py-2 bg-gray-600 text-white rounded-lg">⏪ -5s</button>
                    <button onClick={forward} className="px-4 py-2 bg-gray-600 text-white rounded-lg">⏩ +5s</button>
                </div>
            )}
        </div>
    );
}
