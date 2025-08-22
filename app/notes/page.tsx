//libraries
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
//components
import NotesClient from "./Notes.client";
//services
import { fetchNotes } from "@/lib/api";
// styles
import css from "./NotesPage.module.css";

// This is a Server Component
export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, search: "" }),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </div>
  );
}
