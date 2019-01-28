import React from 'react';
import { Pie, PieChart } from 'recharts';

function ContestScore() {
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={[{ name: 'A', value: 30 }, { name: 'B', value: 40 }]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
        label
      />
    </PieChart>
  );
}

export default ContestScore;
