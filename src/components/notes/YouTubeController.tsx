"use client";

import { useEffect, useRef, forwardRef, RefObject, ForwardedRef } from "react";

declare global {
    interface Window {
        YT: typeof YT;
        onYouTubeIframeAPIReady: () => void;
    }
}

type Props = Readonly<{
    videoId: string;
}>

function YouTubeController({ videoId }: Props, playerRef: ForwardedRef<YT.Player | null>) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Load YouTube API script
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }
    }, []);

    // Load YouTube API script
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }
    }, []);

    useEffect(() => {
        if (!videoId || !containerRef.current) return;

        let player: YT.Player | null = null;

        const assignRef = (instance: YT.Player | null) => {
            if (typeof playerRef === "function") {
                playerRef(instance); // callback ref
            } else if (playerRef) {
                (playerRef as RefObject<YT.Player | null>).current = instance; // object ref
            }
        };

        window.onYouTubeIframeAPIReady = () => {
            if (containerRef.current) {
                player = new window.YT.Player(containerRef.current, {
                    videoId,
                    events: {
                        onReady: () => console.log("Player ready!"),
                    },
                    width: "560",  // hoặc số
                    height: "315", // hoặc số
                    playerVars: {
                        autoplay: 0,
                        rel: 0,
                        modestbranding: 1,
                    }
                });
                assignRef(player);
            }
        };

        if (window.YT?.Player && containerRef.current) {
            player = new window.YT.Player(containerRef.current, {
                videoId,
                events: {
                    onReady: () => console.log("Player ready!"),
                },
            });
            assignRef(player);
        }

        return () => {
            if (player) {
                player.destroy();
                assignRef(null);
                player = null;
            }
        };
    }, [videoId, playerRef]);


    return (
        <div id="player" ref={containerRef} className="w-full h-full"></div>
    );
}

export default forwardRef(YouTubeController)