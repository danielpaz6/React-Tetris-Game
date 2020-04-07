import React from 'react';
import { StyledCell } from './StyledCell';
import { TETROMINOS } from '../../utils/tetrominos';

const cell = ({ type }) => (
	<StyledCell type={type} color={TETROMINOS[type].color} />
)

export default React.memo(cell);