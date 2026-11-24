import type { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'New note',
  description: 'Creating of a new note.',
  openGraph: {
    title: 'New note',
    description: 'Creating of a new note.',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

/** Створення однієї нотатки та збереження чернетки
У цій частині завдання потрібно перенести створення нової нотатки з модального вікна на окрему сторінку,
спростити логіку форми та реалізувати автоматичне збереження чернетки (draft) за допомогою Zustand.

Створення сторінки для нової нотатки

Перенесіть логіку створення нової нотатки із модального вікна на окремий маршрут app\\notes\\action\\create\\page.tsx.
Компонент сторінки CreateNote має створювати наступну розмітку:
<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
  { NoteForm component }
  </div>
</main>

Для цієї сторінки реалізуйте експорт об’єкта metadata з полями title, description.
Значення цих полів мають містити назву і короткий опис сторінки для створення нової нотатки.
Додайте також Open Graph мета-теги title, description, url та imagesз відповідними значеннями.
 */
