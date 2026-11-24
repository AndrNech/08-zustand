import axios from "axios";
import type { Note } from "@/types/note";

interface FetchNotesResponse { 
  notes: Note[];
  totalPages: number;
}

interface CreateNote {
  title: string;
  content: string;
  tag: Note['tag'];
}

const API = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
})

export async function fetchNotes (page: number, search: string, tag?: string): Promise<FetchNotesResponse> {
  const {data} = await API.get<FetchNotesResponse>('', {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
    params: {
      search: search || undefined,
      page,
      perPage: 12,
      tag: tag || undefined
    }
  })

  return data;
}

export async function createNote (payload: CreateNote): Promise<Note> {
  const response = await API.post<Note>('', payload, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      'Content-Type': 'application/json'
    }
  }); return response.data;
}

export async function deleteNote (noteId: Note['id']): Promise<Note> {
  const response = await API.delete<Note>(`/${noteId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      'Content-Type': 'application/json'
    }
  }); return response.data;
}

export async function fetchNoteById (noteId: string): Promise<Note> {
  const {data} = await API.get<Note>(`/${noteId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  }); 
  
  return data;
}
