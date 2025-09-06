import YouTubeController from '@/components/YouTubeController'
import React from 'react'

type NotePageProps = {
    params: {
        videoId: string; // The type should match the expected type of your parameter
    };
};

export default function page({ params }: NotePageProps) {
    const { videoId } = params;
    console.log('videoId', videoId)

    return (
        <YouTubeController videoId={videoId} />
    )
}
