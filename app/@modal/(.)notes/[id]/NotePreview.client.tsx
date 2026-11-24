'use client';

import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import { fetchNoteById } from '@/lib/api';

export default function NotePreviewClient() {
  const params = useParams();
  const id = params.id as string | undefined;
  const router = useRouter();

  const noteQ = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (noteQ.isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (noteQ.isError) {
    return <p>Something went wrong.</p>;
  }

  if (noteQ.isSuccess) {
    const note = noteQ.data;

    return (
      <Modal onClose={() => router.back()}>
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
              <button className={css.backBtn} onClick={() => router.back()}>Back</button>
              {/* <Link className={css.backBtn} href="/notes/filter/all">Back</Link> */}
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.createdAt}</p>
            </div>
          </div>
        </main>
        </Modal>
    );
  }
}
