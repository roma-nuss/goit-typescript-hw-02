import React, { FormEvent } from "react";
import { ImSearch } from "react-icons/im";
import styles from "./SearchBar.module.css";
import { emptyFieldMessage } from "../../messages/toastMessages";

interface SearchBarProps {
  onSubmit: (inputValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputElement = event.currentTarget.elements.namedItem(
      "searchInput"
    ) as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.trim() === "") {
      emptyFieldMessage();
      return;
    }

    onSubmit(inputValue);

    event.currentTarget.reset();
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button className={styles.btn} type="submit">
          <ImSearch className={styles.ico} />
        </button>

        <input
          className={styles.input}
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images"
        />
      </form>
    </header>
  );
};

export default SearchBar;
