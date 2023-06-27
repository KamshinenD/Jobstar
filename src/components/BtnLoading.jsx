import React from 'react';
import styled from 'styled-components';

const BtnLoading = () => {
    return (
        <Wrapper></Wrapper>
    )
}

export default BtnLoading;

const Wrapper = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    border: 4px solid #fff;
    border-radius: 50%;
    border-top-color: var(--primary-500);
    margin: 0 auto;
    animation: spinner 2s linear infinite;

    @keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}
`
