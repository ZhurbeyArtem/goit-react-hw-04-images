import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import { HeaderStyle } from './Header.style';
import {
  Form,
  SearchbarWrapper,
  Searchbar,
  SearchButton,
} from './Searchbar.style';

const Header = ({ findImages }) => {
  const [filter, setFilter] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    findImages(filter);
    setFilter('');
    e.target.reset();
  };

  return (
    <HeaderStyle>
      <Form onSubmit={handleSubmit}>
        <SearchbarWrapper>
          <Searchbar
            type="text"
            placeholder="Search images and photos"
            onInput={e => setFilter(e.target.value)}
          />
          <SearchButton type="submit">
            <SearchOutlined />
          </SearchButton>
        </SearchbarWrapper>
      </Form>
    </HeaderStyle>
  );
};

export default Header;
