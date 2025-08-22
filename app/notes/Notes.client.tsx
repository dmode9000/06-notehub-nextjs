"use client";
// react
import { useEffect, useState } from "react";
// libraries
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
// components
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
// styles
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setSelectedPage(1);
  }, 500);

  const { data, isLoading, isSuccess, isPlaceholderData } = useQuery({
    queryKey: ["notes", selectedPage, searchQuery],
    queryFn: () => fetchNotes({ page: selectedPage, search: searchQuery }),
    placeholderData: keepPreviousData,
  });

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (isSuccess && searchQuery && data && !isPlaceholderData) {
      const foundCount = data.notes.length;
      if (foundCount === 0) {
        toast.error(`No notes found for "${searchQuery}"`);
      } else {
        toast.success(
          `Found ${foundCount} note${foundCount === 1 ? "" : "s"} for "${searchQuery}"`
        );
      }
    }
  }, [isSuccess, searchQuery, data, isPlaceholderData]);

  return (
    <>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={selectedPage}
            onPageSelect={(page) => setSelectedPage(page)}
          />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>
      {data && <NoteList notes={data.notes} isOldData={isPlaceholderData} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm closeFormModal={closeModal} />
        </Modal>
      )}
    </>
  );
}
