import main from '../assets/images/main.svg';
import styled from 'styled-components';
import { Logo } from '../components'
import { Link } from 'react-router-dom'


import React from 'react'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo className='logo' />
            </nav>
            <div className="container page">
                {/* info */}
                <div className="info">
                    <h1>Job <span>tracking</span> app</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia alias vel quaerat mollitia dolores! Quidem aliquid ea assumenda? Cupiditate tenetur veniam expedita laudantium in culpa libero magni sit molestiae maxime!</p>
                    <Link to='/register' className='btn btn-hero'>Login or Register </Link>
                </div>
                <img src={main} alt="main" className='main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing;

const Wrapper = styled.main`
    nav{
        width:var(--fluid-width);
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
    }

    .page{
        min-height:calc(100vh- var(--nav-height));
        display: grid;
        /* grid-template-columns: 1fr 1fr; */
        align-items:center;
    }

    h1{
        font-weight:700;
    span{
        color:var(--primary-500)
    }
    }
    p{
        color: var(--grey-600);
    }

    .main-img{
        display: none;
    }

    @media (min-width:992px){
        .page{
            grid-template-columns: 1fr 1fr;
            column-gap: 3rem;
        }

        .main-img{
        display: block;
    }
    }

`