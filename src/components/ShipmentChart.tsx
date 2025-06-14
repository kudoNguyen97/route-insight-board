
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', delivered: 400, pending: 240, inTransit: 160 },
  { name: 'Feb', delivered: 300, pending: 139, inTransit: 221 },
  { name: 'Mar', delivered: 200, pending: 980, inTransit: 290 },
  { name: 'Apr', delivered: 278, pending: 390, inTransit: 200 },
  { name: 'May', delivered: 189, pending: 480, inTransit: 181 },
  { name: 'Jun', delivered: 239, pending: 380, inTransit: 250 },
  { name: 'Jul', delivered: 349, pending: 430, inTransit: 210 },
];

const ShipmentChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#52c41a" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#52c41a" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#faad14" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#faad14" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorInTransit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#1890ff" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="delivered" 
          stackId="1"
          stroke="#52c41a" 
          fillOpacity={1} 
          fill="url(#colorDelivered)" 
        />
        <Area 
          type="monotone" 
          dataKey="inTransit" 
          stackId="1"
          stroke="#1890ff" 
          fillOpacity={1} 
          fill="url(#colorInTransit)" 
        />
        <Area 
          type="monotone" 
          dataKey="pending" 
          stackId="1"
          stroke="#faad14" 
          fillOpacity={1} 
          fill="url(#colorPending)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ShipmentChart;
