/**
 * Global Player Store — Sayfalar arası sticky player state
 * Vanilla pub/sub pattern (React context olmadan, wouter ile uyumlu)
 */

export interface PlayerTrack {
  id: number;
  title: string;
  slug: string;
  youtubeId: string;
}

type Listener = (state: PlayerState) => void;

export interface PlayerState {
  track: PlayerTrack | null;
  playing: boolean;
  visible: boolean;
}

let state: PlayerState = { track: null, playing: false, visible: false };
const listeners = new Set<Listener>();

export const playerStore = {
  getState: () => state,

  play: (track: PlayerTrack) => {
    state = { track, playing: true, visible: true };
    listeners.forEach(l => l(state));
  },

  pause: () => {
    state = { ...state, playing: false };
    listeners.forEach(l => l(state));
  },

  resume: () => {
    state = { ...state, playing: true };
    listeners.forEach(l => l(state));
  },

  hide: () => {
    state = { ...state, visible: false, playing: false };
    listeners.forEach(l => l(state));
  },

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
