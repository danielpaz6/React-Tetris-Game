import React from 'react';
import Cell from './Cell';

const stage = ({ stage }) => (
    <div>
		{stage.map(row => row.map((cell, x) => 
			<Cell key={x} type={cell[0]} />
		))}
    </div>
);

export default stage;