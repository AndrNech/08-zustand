import type { Metadata } from 'next';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Note } from '@/types/note';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({params}:
  NotesPageProps): Promise<Metadata> {

  const { slug } = await params;
  const filter = slug[0];
  const title = filter === 'all'
    ? 'All Notes | NoteHub'
    : `${filter} Notes | NoteHub`;
  const description = filter === 'all'
    ? 'Browse all notes in NoteHub.'
    : `Browse notes filtered by ${filter}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${filter} notes`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag: Note['tag'] | undefined =
    slug[0] === 'all' ? undefined : (slug[0] as Note['tag']);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
