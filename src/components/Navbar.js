import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchUser } from '../features/userDetailSlice';
import styled from 'styled-components';
const Nav = styled.nav`
  background-color: #00aaff; /* Light blue solid color */
  background: linear-gradient(45deg, #00aaff, #0072ff); /* Gradient option */
  padding: 10px 20px;
`;

const NavbarBrand = styled.h4`
  color: #ffffff;
  margin-right: auto;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  margin: 0 15px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SearchInput = styled.input`
  width: 30%;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

const Navbar = () => {
  const allusers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState('');

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  return (
    <Nav>
      <div className="container-fluid">
        <NavbarBrand>Redux Toolkit</NavbarBrand>

        <div className="d-flex align-items-center">
          <NavLink to="/">Create Post</NavLink>
          <NavLink to="/read">All Posts ({allusers.length})</NavLink>
          <SearchInput
            type="search"
            placeholder="Search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
