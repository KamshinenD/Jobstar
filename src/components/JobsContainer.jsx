import React, { useEffect } from 'react';
import styled from 'styled-components'
import Loading from './Loading';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';


const JobsContainer = () => {
  const { jobs, isLoading, page, search, searchStatus, searchType, sort } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchStatus, searchType, sort])

  useEffect(() => {
    dispatch(getAllJobs())
  }, [])

  if (isLoading) {
    return (
      <Loading center />
    )
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {
          jobs.map((job) => {
            return <Job key={job._id} {...job} />
          })
        }
      </div>
      <PageBtnContainer />
    </Wrapper>
  )

}

export default JobsContainer;




const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`