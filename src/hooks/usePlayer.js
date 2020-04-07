import { useState, useCallback } from 'react';
import { TETROMINOS, randomTetromino } from '../utils/tetrominos';
import { STAGE_WIDTH } from '../utils/gameHelpers';
import { checkCollision } from '../utils/collisionDetection';

export const usePlayer = () => {
	const [player, setPlayer] = useState({
		pos: {x: 0, y: 0},
		tetromino: TETROMINOS[0].shape,
		colided: false
	});

	const rotate = (matrix, dir) => {
		// Transpose the matrix
		const rotatedTetro = matrix.map((_, index) => 
			matrix.map(col => col[index])
		);

		// Reverse each row to get rotated matrix
		if(dir > 0) return rotatedTetro.map(row => row.reverse());
		
		// Otherwise, the opposite direction
		return rotatedTetro.reverse();
	};

	const playerRotate = (stage, dir) => {
		// Deep copy of the player
		const clonedPlayer = JSON.parse(JSON.stringify(player));
		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
		
		const pos = clonedPlayer.pos.x;
		let offset = 1;

		// Back and forth movement the tetromino to check for side collition while rotating
		while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
			clonedPlayer.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));

			if(offset > clonedPlayer.tetromino[0].length) {
				// Cannot rotate
				return;
			}
		}

		setPlayer(clonedPlayer);
	}

	const updatePlayerPos = ({ x, y, collided }) => {
		setPlayer(prev => ({
		  ...prev,
		  pos: { x: (prev.pos.x + x), y: (prev.pos.y + y)},
		  collided,
		}))
	  }

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: {
				x: STAGE_WIDTH / 2 - 2,
				y: 0
			},
			tetromino: randomTetromino().shape,
			collided: false
		})
	}, [])

	return [player, updatePlayerPos, resetPlayer, playerRotate];
}