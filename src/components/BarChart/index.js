import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: "Quản trị",
      "Lượt Xem": 2780,
    },
    {
      name: "Kỹ năng mềm",
      "Lượt Xem": 2785,
    },
    {
      name: "Công nghệ",
      "Lượt Xem": 4000,
    },
    {
      name: "Tâm lý",
      "Lượt Xem": 3000,
    },
    {
      name: "Triết",
      "Lượt Xem": 2000,
    },
    {
      name: "Xã hội",
      "Lượt Xem": 2790,
    },
    {
      name: "Thể thao",
      "Lượt Xem": 2720,
    },
  ];
  return (
    <BarChart width={200} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis dataKey="Lượt Xem" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Lượt Xem" fill="#8884d8" />
    </BarChart>
  );
};

export default Chart;
