import React from 'react';
import { StyledCell } from './StyledCell';
import { TETROMINOS } from '../../utils/tetrominos';
import './tetrominos.css';

const cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color} />
)

export default cell;