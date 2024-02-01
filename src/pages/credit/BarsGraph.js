
import React from 'react';
import Card from '@mui/material/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react'
import axios from 'axios'

const BarGraph = () => {

    const [salesData, setSalesData] = useState([])

    useEffect(() => {
        const getter = async () => {
            const url = process.env.NEXT_PUBLIC_API_URL + 'credit/totalCreditInfo'
            const resp = await axios.get(url)
            setSalesData(resp.data)

            //   const fine = resp.data
            console.log('resp ,data', resp.data)
        }

        getter()
    }, [])

    const colorScale = (value) => {
        if (value < 5000) {
            return '#FF5733'; // Set color for values less than 5000
        } else if (value >= 5000 && value < 10000) {
            return '#FFC300'; // Set color for values between 5000 and 10000
        } else {
            return '#36D7B7'; // Set color for values greater than or equal to 10000
        }
    };

    const transformedData = salesData.map(item => ({
        name: item.title,
        ETB: parseFloat(item.stats.replace(' ETB', ''))
    }));

    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={300}
                    height={300}
                    data={transformedData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{ fontSize: 14, color: ' #500000' }} />
                    <YAxis tickFormatter={value => value.toLocaleString()} />

                    <Tooltip />
                    <Legend />
                    <Bar tickFormatter={value => value.toLocaleString()} dataKey="ETB" fill="#8884d8" scale={colorScale} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default BarGraph;
