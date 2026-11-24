import css from './NoteForm.module.css';
// import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
// import * as Yup from 'yup';
import router from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, CreateNote } from '@/lib/api';
import { useNoteDraftStore } from '@/lib/store/noteStore'

// interface NoteFormProps {
//   onClose: () => void;
// }

// interface NoteFormValues {
//   title: string;
//   content: string;
//   tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
// }

// const INITIAL_VALUES: NoteFormValues = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

// const FormValidationScheme = Yup.object({
//   title: Yup.string()
//     .min(3, 'Too short')
//     .max(50, 'Too long')
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Too long'),
//   tag: Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
//     .required('Tag is required'),
// });

// type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
    | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {setDraft({...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
    onError: error => {
      console.error(error);
    },
  });

  const queryClient = useQueryClient();

  async function handleSubmit(formData: FormData) {
    const values = Object.fromEntries(formData) as CreateNote;
    // const title = (formData.get('title') as string) || '';
    // const content = (formData.get('content') as string) || '';
    // const tag = (formData.get('tag') as NoteTag) || 'Todo';
    // await mutateAsync({title, content, tag});
    await mutateAsync(values);
  }

  const handleCancel = () => router.push('/notes/filter/all');

  return (
    // <Formik
    //   initialValues={INITIAL_VALUES}
    //   validationSchema={FormValidationScheme}
    //   onSubmit={handleSubmit}
    // >
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          defaultValue={draft?.title}
          onChange={handleChange} 
        />
        {/* <ErrorMessage name="title" className={css.error} component="span" /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          defaultValue={draft?.content}
          onChange={handleChange} 
        />
        {/* <ErrorMessage name="content" className={css.error} component="span" /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          required
          onChange={handleChange} 
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage name="tag" className={css.error} component="span" /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
    // </Formik>
  );
}

/**Оновлення компонента NoteForm

Внесіть зміни у компонент components/NoteForm/NoteForm.tsx.
Компонент має створювати таку ж розмітку та зберігати той самий функціонал,
як і раніше, але без використання Formik.

Для цього:
приберіть компоненти Formik та ErrorMessage;
замініть Form на стандартну HTML-форму <form>;
замініть Field на нативні HTML-поля (input, textarea, select тощо);
видаліть логіку та імпорти, пов’язані з Formik;
для обробки форми використайте formAction.

У результаті форма має працювати через стандартні HTML-форми без Formik.
Це необхідно для подальшої інтеграції збереження чернетки через Zustand без створення зайвої та складної логіки.
*/