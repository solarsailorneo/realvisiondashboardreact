import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const TimeSeriesDashboard = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://127.0.0.1:8080/data')
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Time Series Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {Object.keys(chartData).map(key => (
          <div key={key} style={{ width: 'calc(50% - 10px)', marginBottom: '20px' }}>
            <h2>{key}</h2>
            <LineChart width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Time" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartData[key]?.map((timeSeries, index) => (
                <Line key={index} type="monotone" data={timeSeries} dataKey="Value" />
              ))}
            </LineChart>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSeriesDashboard;
