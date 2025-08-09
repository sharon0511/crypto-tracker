import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const isDarkAtom = atomWithStorage<boolean>('darkTheme', false);

export const toggleThemeAtom = atom(null, (get, set) => {
  set(isDarkAtom, !get(isDarkAtom));
});