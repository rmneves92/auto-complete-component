import React, { FC, useState, useRef, useEffect } from 'react';
import styles from './AutoComplete.module.css';
import { Options } from '../Options/Options';
import { Pokemon } from '../../types';

const ARROW_DOWN_KEY = 40;
const ARROW_UP_KEY = 38;
const ENTER_KEY = 13;

interface Props {
  list: Pokemon[];
}

export const AutoComplete: FC<Props> = ({ list }) => {
  const [filteredOptions, setFilteredOptions] = useState<Pokemon[]>([]);
  const [optionFocused, setOptionFocused] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Pokemon | null>(null);
  const [querySearch, setQuerySearch] = useState('');

  const querySearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    querySearchRef.current?.focus();
  }, []);

  useEffect(() => {
    setOptionFocused(0);
  }, [filteredOptions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuerySearch(e.target.value);

    const filtered = filterOptions(e.target.value);

    setFilteredOptions(filtered);
  };

  const filterOptions = (value: string) => {
    return list.filter((option) => option.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  };

  const handleSelectItem = (item: Pokemon) => {
    setFilteredOptions([]);

    setQuerySearch('');

    if (querySearchRef.current) {
      querySearchRef.current.focus();
    }

    setSelectedOption(item);
    setOptionFocused(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case ARROW_DOWN_KEY:
        if (optionFocused + 1 < filteredOptions.length) {
          setOptionFocused((prevState) => prevState + 1);
        }
        break;

      case ARROW_UP_KEY:
        if (optionFocused !== 0) {
          setOptionFocused((prevState) => prevState - 1);
        }
        break;

      case ENTER_KEY:
        const selectedItem = filteredOptions[optionFocused];
        handleSelectItem(selectedItem);
        break;

      default:
        break;
    }
  };

  return (
    <>
      {selectedOption && <p>Selected option: {selectedOption.name}</p>}

      <div className={styles.searchBox}>
        <span className={styles.searchIcon}></span>
        <input value={querySearch} ref={querySearchRef} className={styles.input} type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} />
      </div>

      <Options list={filteredOptions} handleSelectItem={handleSelectItem} optionFocused={optionFocused} searchQuery={querySearch.trim()} />
    </>
  );
};
