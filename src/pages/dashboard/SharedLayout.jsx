import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Navbar, BigSidebar, SmallSidebar } from '../../components'

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div className='navbar-outlet'>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout;

const Wrapper = styled.section`
  .dashboard {
    /* display: grid;
    grid-template-columns:1fr; */
    display: flex;
    flex-direction: column;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  .navbar-outlet{
    width: 100%;
  }
  @media (min-width: 992px) {
    .dashboard {
      /* grid-template-columns: auto 1fr; */
      flex-direction: row;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;