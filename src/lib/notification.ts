import { writable } from 'svelte/store';

const messageStore = writable<string | null>(null);
const messageStateStore = writable<'success' | 'error' | null>(null);

export function notify(message: string, state: 'success' | 'error' | null = 'success') {
  messageStore.set(message);
  messageStateStore.set(state);
  // Auto-clear notification after 3 seconds
  setTimeout(() => messageStore.set(null), 3000);
  setTimeout(() => messageStateStore.set(null), 3000);
}

export { messageStore, messageStateStore };