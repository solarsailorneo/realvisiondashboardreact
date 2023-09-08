import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockData = {
  chart1: [
    [{ Time: '2023-01-01', Value: 100 }, { Time: '2023-01-02', Value: 105 }],
    [{ Time: '2023-01-01', Value: 50 }, { Time: '2023-01-02', Value: 52 }]
  ],
  chart2: [
    [{ Time: '2023-01-01', Value: 200 }, { Time: '2023-01-02', Value: 205 }],
    [{ Time: '2023-01-01', Value: 75 }, { Time: '2023-01-02', Value: 78 }]
  ],
  chart3: [
    [{ Time: '2023-01-01', Value: 200 }, { Time: '2023-01-02', Value: 205 }],
    [{ Time: '2023-01-01', Value: 75 }, { Time: '2023-01-02', Value: 78 }]
  ],
  chart4: [
    [{ Time: '2023-01-01', Value: 200 }, { Time: '2023-01-02', Value: 205 }],
    [{ Time: '2023-01-01', Value: 75 }, { Time: '2023-01-02', Value: 78 }]
  ]
  // ... add mock data for chart3 and chart4 similarly
};

const TimeSeriesDashboard = () => {
  return (
    <div>
      <h1>Time Series Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {Object.keys(mockData).map(key => (
          <div key={key} style={{ width: 'calc(50% - 10px)', marginBottom: '20px' }}>
            <h2>{key}</h2>
            <LineChart width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Time" />
              <YAxis />
              <Tooltip />
              <Legend />
              {mockData[key].map((timeSeries, index) => (
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
