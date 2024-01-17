// BarGraph.js

import React from 'react';
import Card from '@mui/material/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Total Credit Given', Birr: 0 },
    { name: 'Total Credit Paid', Birr: 0 },
    { name: 'Total Credit Unpaid', Birr: 0 },
    { name: 'Total Unpaid Credit With Interest', Birr: 0 },
];










const BarGraph = () => {
    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={300}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{ fontSize: 14, color: ' #500000' }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Birr" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default BarGraph;
