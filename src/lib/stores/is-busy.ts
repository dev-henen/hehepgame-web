import { writable } from 'svelte/store';

const isBusyStore = writable<boolean | null>(null);

export function setIsBusy(isBusy: boolean | null) {
  isBusyStore.set(isBusy);
}

export { isBusyStore };