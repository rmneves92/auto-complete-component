import React, { FC, useMemo } from 'react';
import styles from './Options.module.css';
import { Pokemon } from '../../types';

interface Props {
  list: Pokemon[];
  handleSelectItem: (item: Pokemon) => void;
  optionFocused?: number;
  searchQuery: string;
}

export const Options: FC<Props> = ({ list, handleSelectItem, optionFocused, searchQuery }) => {
  const getItemClass = (index: number) => {
    let className = styles.optionItem;

    if (index === optionFocused) {
      className = `${className + ' ' + styles.optionActive}`;
    }

    return className;
  };

  // Memoized function to bold the matching text
  const textToBold = useMemo(
    () =>
      (match: string): string => {
        const regex = new RegExp(searchQuery, 'g');
        return match.replace(regex, '<b>$&</b>');
      },
    [searchQuery]
  );

  return (
    <div>
      {searchQuery && (
        <ul className={styles.list}>
          {list.length
            ? list.map((item, index) => (
                <li key={item.name} className={`${getItemClass(index)}`} onClick={() => handleSelectItem(item)}>
                  <img alt={item.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} />
                  <span dangerouslySetInnerHTML={{ __html: textToBold(item.name) }} />
                </li>
              ))
            : searchQuery && <p>No matching items found</p>}
        </ul>
      )}
    </div>
  );
};
