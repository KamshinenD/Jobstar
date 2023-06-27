import React, { useState, useMemo } from 'react';
import styled from 'styled-components'
import { FormRow, FormRowSelect } from '.';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } = useSelector((store) => store.allJobs)
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const [localSearch, setLocalSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    // if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters())
  };

 
   const debounce = () => {
    let timeOutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };
  const optimizeDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search form</h4>
        <div className="form-center">

          {/* Search position */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizeDebounce}
          // value={search}
          // handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />

          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer;


const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;