import React from 'react';
import PropTypes from 'prop-types';
import { Pie, PieChart, Legend, Cell } from 'recharts';

const COLORS = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#bcf60c',
  '#fabebe',
  '#008080',
  '#e6beff',
  '#9a6324',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000075',
];

function getPie(data, center) {
  return (
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      innerRadius={0}
      outerRadius={180}
      label
    >
      {data.map((entry, index) => (
        <Cell fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  );
}

function ContestScore({ id, title, votes, projects }) {
  const data = projects
    .map(project => ({
      ...project,
      votes: project.votes.filter(el => votes.some(vote => vote.id === el.id)),
    }))
    .map(project => ({
      name: project.title,
      value: project.votes.length,
    }));
  console.log(data);
  return (
    <div key={id}>
      <PieChart width={450} height={450} style={{ margin: '0 auto' }}>
        <Legend verticalAlign="top" height={36} />
        {getPie(data)}
      </PieChart>
    </div>
  );
}

ContestScore.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  votes: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
};

export default ContestScore;
