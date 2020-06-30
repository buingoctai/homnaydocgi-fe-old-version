import React from "react";
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts'


const Chart = () => {
    const data = [
        {
            "name": 'T.Trẻ',
            "Lượt Xem": 4000,

        },
        {
            "name": "T.Niên",
            "Lượt Xem": 3000,

        },
        {
            "name": "CafeBiz",
            "Lượt Xem": 2000,

        },
        {
            "name": "TechInsight",
            "Lượt Xem": 2780,

        },
    ]
    return (

        <BarChart width={150} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="Lượt Xem" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Lượt Xem" fill="#8884d8" />
        </BarChart>

    );
}

export default Chart;