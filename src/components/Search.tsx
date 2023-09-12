import './Search.css';
import React from 'react';


interface SearchProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

export function Search({ name, setName, onSubmit }: SearchProps) {
  return (
    <div className={'search'}>
      <input
        type="text"
        placeholder="Enter City Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>
        <img src="/Images/search.png" onClick={onSubmit} alt="" />
      </button>
    </div>
  );
}
