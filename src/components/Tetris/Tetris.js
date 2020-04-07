import React, { useState } from 'react';

import { createStage } from '../../utils/gameHelpers';

// Components
import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from "./StyledTetris";

// Custom Hooks
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';

const Tetris = () => {

	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer);

	console.log('re-render');

	const movePlayer = dir => {
		updatePlayerPos({ x: dir, y: 0 });
	}

	const handleStartGame = () => {
		// Reset everything
		setStage(createStage());
		resetPlayer();
	}

	const drop = () => {
		updatePlayerPos({x: 0, y: 1, collided: false});
	}

	const dropPlayer = () => {
		drop();
	}

	const move = ({ keyCode }) => {
		if(!gameOver) {

			switch(keyCode) {
				case 37: movePlayer(-1); break; // Left
				case 39: movePlayer(1); break; // Right
				case 40: dropPlayer(); break; // Down 
			}
		}
	}

	return (
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
					<div>
						<Display text="Score" />
						<Display text="Rows" />
						<Display text="Level" />
						<StartButton callback={handleStartGame} />
					</div>
					)}
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;