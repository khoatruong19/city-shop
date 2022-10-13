import { Group, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import MetaData from '../layout/MetaData';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleNavigateSearchResult = () => {
    if (keyword.trim()) navigate(`/products/${keyword}`);
    else navigate(`/products`);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNavigateSearchResult();
  };

  return (
    <Group
      sx={{
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <MetaData title="Search" />
      <form onSubmit={handleSubmitSearch}>
        <TextInput
          size="xl"
          placeholder="Search for items ..."
          rightSection={
            <MagnifyingGlassIcon
              style={{ color: 'gray' }}
              className="navIcon"
              onClick={handleNavigateSearchResult}
            />
          }
          sx={{
            minWidth: '70vw',
          }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </Group>
  );
};

export default Search;
