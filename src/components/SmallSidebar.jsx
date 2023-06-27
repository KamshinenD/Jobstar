import React from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../features/sidebarToggle/sidebarSlice'
import Links from '../utils/links'

const SmallSidebar = () => {
  const { sidebarIsOpen } = useSelector((state) => state.sidebar)
  // console.log(sidebarIsOpen);
  const dispatch = useDispatch();

  const handleShowSidebar = (e) => {
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <div className={!sidebarIsOpen ? "sidebar-container" : "sidebar-container show-sidebar"}>
        <div className="content">
          <button className="close-btn" onClick={handleShowSidebar}> <FaTimes /></button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {Links.map((link) => {
              const { text, path, id, icon } = link;
              return (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  key={id}
                  onClick={handleShowSidebar}
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              )

            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar;



const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }
`;