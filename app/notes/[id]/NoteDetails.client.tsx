"use client";

//Libraries
import { useQuery } from "@tanstack/react-query";
//Next
import { useParams } from "next/navigation";
//Services
import { fetchNoteById } from "@/lib/api";
//components
import fetchIdError from "./error";
//Styles
import css from "./NoteDetails.module.css";
import Loading from "@/app/loading";
import Error from "@/app/notes/error";

//Client component
export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Loading />;
  if (error || !note) return fetchIdError({ error });

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
        <p className={css.tag}>{note.tag}</p>
      </div>
    </div>
  );
}
