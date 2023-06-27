import styled from 'styled-components'
import React, { useState } from 'react';
import AreaChart from './AreaChartComponent';
import BarChart from './BarChartComponent'
import { useSelector } from 'react-redux'

const ChartsContainer = () => {
    const [barChart, setBarChart] = useState(true);
    const { monthlyApplications: data } = useSelector((store) => store.allJobs);

    const handleChartType = () => {
        setBarChart(!barChart)
    }

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type='button' onClick={handleChartType}>{barChart ? 'Area Chart' : 'Bar Chart'}</button>
            {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer;



const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;