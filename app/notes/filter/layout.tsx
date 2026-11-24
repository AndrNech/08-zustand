import css from './LayoutNotes.module.css'

interface NoteFilterLayout {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NoteFilterLayout({ children, sidebar }: NoteFilterLayout) {
  return (
    <>
      <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
        <div className={css.notesWrapper}>{children}</div>
      </section>
    </>
  );
}