import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type {Note} from '@/types/note'

interface NotesPageProps {
  // params: Promise<{ tag: Note['tag'] | 'all' }>;
  params: Promise<{slug: string[]}>
}

export default async function NotesPage({params}: NotesPageProps) {
  const {slug} = await params;
  const tag: Note['tag'] | undefined = slug[0] === "all" ? undefined : slug[0] as Note['tag'];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}