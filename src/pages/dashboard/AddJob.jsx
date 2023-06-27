import React, { } from 'react';
import styled from 'styled-components';
import { FormRow, FormRowSelect } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleChange, clearValues, createJob, editJob } from '../../features/job/jobSlice';
import BtnLoading from '../../components/BtnLoading';


const AddJob = () => {
  const { isLoading, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, editJobId, isEditing } = useSelector(store => store.job)
  // const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('please fill out all fields')
      return;
    }
    if (isEditing) {
      dispatch(editJob({ jobId: editJobId, job: { position, company, jobLocation, jobType, status } }))
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }))
  }

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }))
  }

  const handleClear = () => {
    dispatch(clearValues());
  }

  // useEffect(() => {
  //   if (isEditing) {
  //     dispatch(handleChange({ name: 'jobLocation', value: user.location }))
  //   }
  // }, [])

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        <div className="form-center">
          {/* Position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* Position */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* Position */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* Status */}
          <FormRowSelect
            name='status'
            list={statusOptions}
            value={status}
            handleChange={handleJobInput}
          />

          {/* Job type */}
          <FormRowSelect
            name='jobType'
            labelText='job Type'
            list={jobTypeOptions}
            value={jobType}
            handleChange={handleJobInput}
          />

          <div className="btn-container">
            <button type='button' className='btn btn-block clear-btn' onClick={handleClear}>Clear</button>
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>{isEditing ? 'Save Changes' : (!isLoading ? 'Submit' : <BtnLoading />)}</button>
          </div>
        </div>

      </form>
    </Wrapper>
  )
}

export default AddJob;



const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
    grid-template-columns: 1fr;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;