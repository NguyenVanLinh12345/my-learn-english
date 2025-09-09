import NoteBoard from '@/components/notes/NoteBoard';

type NotePageProps = {
    params: Promise<{ videoId: string }>;
};

export default async function page({ params }: NotePageProps) {
    const { videoId } = await params;

    return (
        <NoteBoard videoId={videoId} />
    )
}
