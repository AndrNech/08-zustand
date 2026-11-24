"use client";

import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type {Note} from '@/types/note';

interface NotesClientProps {
  tag?: Note["tag"] | undefined;
}

export default function NotesClient({ tag = undefined}: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isSuccess && data.notes.length === 0) {
      toast.error("Nothing found");
    }
  }, [isSuccess, data]);

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setPage(1);
  }, 1000);

  function handlePageChange(page: number) {
    setPage(page);
  }

  function closeModalHandler() {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <Toaster />

      {isSuccess && (
        <header className={css.toolbar}>
          <SearchBox search={search} onSearch={handleSearch} />

          {data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}

          <button
            className={css.button}
            onClick={() => setIsModalOpen(true)}
          >
            Create note +
          </button>
        </header>
      )}

      {isSuccess && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal onClose={closeModalHandler}>
          <NoteForm onClose={closeModalHandler} />
        </Modal>
      )}
    </div>
  );
}
