import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const favoritesAtom = atomWithStorage('favorites', []);
export const historyAtom = atomWithStorage('history', []);
export const nameAtom = atom('');
export const dataAtom = atom({
  celcius: 10,
  name: 'Germany',
  humidity: 10,
  speed: 2,
  image: 'clouds',
});
export const showSidebarAtom = atom(false);
