import { useState, useEffect } from "react";
import { FormRow, Logo } from '../components';
import styled from "styled-components";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import BtnLoading from "../components/BtnLoading";


const initialStaate = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Register = () => {
  const [values, setValues] = useState(initialStaate);
  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields')
      return;
    };
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  };

  const handleDemoLogin = () => {
    dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }))
  }


  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo className='logo' />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        {/* password*/}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block hidebtn" disabled={isLoading}>{isLoading ? 'Loading...' : (values.isMember ? 'Login' : 'Submit')}</button>
        <button type="button" className="btn btn-block btn-hipster" onClick={handleDemoLogin} disabled={isLoading}>{isLoading ? <BtnLoading /> : 'Demo'}</button>

        <p>
          {values.isMember ? "Don't have an account?" : "Already have an account?"}
          <button type='btn' className="member-btn" onClick={toggleMember}>{values.isMember ? 'Register' : 'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register;



const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`