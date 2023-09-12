import React from 'react';
import { useAtom } from 'jotai';
import styles from './Sidebar.module.css';
import { favoritesAtom, historyAtom } from '../utils/atoms';

interface SidebarProps {
  onClick: (item: string) => void;
}

export function Sidebar({ onClick }: SidebarProps) {
  const [history] = useAtom(historyAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const removeFavorite = (favorite: string) => {
    setFavorites((prev) => prev.filter((item) => item !== favorite));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_box}>
        <h4>Favorites:</h4>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((favorite, i) => (
              <li key={`favorite-${i}`}>
                <button onClick={() => onClick(favorite)}>{favorite}</button>
                <button type="button" onClick={() => removeFavorite(favorite)}>
                  remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet</p>
        )}
      </div>
      <div className={styles.sidebar_box}>
        <h4>History:</h4>
        {history.length > 0 ? (
          <ul>
            {history.map((item, i) => (
              <li key={`history-${i}`}>
                <button onClick={() => onClick(item)}>{item}</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No history yet</p>
        )}
      </div>
    </div>
  );
}
