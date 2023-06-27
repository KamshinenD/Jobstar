import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import styled from 'styled-components';

const Error = () => {
  return (
    <Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you are looking for</p>
        <Link to='/'>Back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error;




const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  
  img {
    width: 50vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

    h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;