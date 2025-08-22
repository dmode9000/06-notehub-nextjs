//components
import NotesClient from "./Notes.client";
//services
import { fetchNotes } from "@/lib/api";
// styles
import css from "./NotesPage.module.css";

// This is a Server Component
export default async function NotesPage() {
  const response = await fetchNotes();

  return (
    <div className={css.app}>
      {response?.notes?.length > 0 && <NotesClient initialNotes={response.notes} />}
    </div>
  );
}
