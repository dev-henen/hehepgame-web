import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const openDialogs = new Set<symbol>();
const subscribers: Set<() => void> = new Set();

function updateBodyScroll() {
    if (!browser) return;
    document.documentElement.style.overflow = openDialogs.size > 0 ? 'hidden' : '';
    subscribers.forEach(fn => fn());
}

export const dialogScrollStore = {
    open: (instanceId: symbol) => {
        openDialogs.add(instanceId);
        updateBodyScroll();
    },
    close: (instanceId: symbol) => {
        openDialogs.delete(instanceId);
        updateBodyScroll();
    },
    subscribe: (fn: () => void) => {
        subscribers.add(fn);
        return () => subscribers.delete(fn);
    }
};
