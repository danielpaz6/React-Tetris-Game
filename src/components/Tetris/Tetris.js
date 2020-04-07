import React, { useState } from 'react';

import { createStage } from '../../utils/gameHelpers';
import { checkCollision } from '../../utils/collisionDetection';

// Components
import Stage from '../Stage/Stage';
import Instructions from "../Instructions/Instructions";

// Styled Components
import { StyledTetris } from "./StyledTetris";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Custom Hooks
import { useInterval } from "../../hooks/setInterval";
import { useEventListener } from "../../hooks/useEventListener";
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import { useGameStatus } from '../../hooks/useGameStatus';

const Tetris = () => {

	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	
	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

	const movePlayer = dir => {
		if(!checkCollision(player, stage, {x: dir, y: 0}))
			updatePlayerPos({ x: dir, y: 0 });
	}

	const handleStartGame = () => {
		// Reset everything
		setStage(createStage());
		setDropTime(700);
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
	}

	const drop = () => {
		// Increase level when player has cleared 10 rows
		if (rows > (level + 1) * 10) {
			// Increase the level
			setLevel(prev => prev + 1);

			// Increase the speed
			setDropTime(700 / (level + 1) + 200);
		}

		if(!checkCollision(player, stage, {x: 0, y: 1}))
			updatePlayerPos({x: 0, y: 1, collided: false});
		else {
			// Game Over
			 if(player.pos.y < 1) {
				console.log("Game Over!");
				setGameOver(true);
				setDropTime(null);
			 }

			updatePlayerPos({x: 0, y: 0, collided: true});
		}
	}

	const dropPlayer = () => {
		drop();
	}

	const move = ({ keyCode }) => {
		if(!gameOver) {
			switch(keyCode) {
				case 32: if(dropTime === null) handleStartGame(); break; // Space
				case 37: movePlayer(-1); break; // Left
				case 39: movePlayer(1); break; // Right
				case 40: dropPlayer(); break; // Down
				case 38: playerRotate(stage, 1); break; // Up
				default: break;
			}
		}
	}

	useInterval(() => {
		drop();
	}, dropTime);

	// Add event listener to the window element
	useEventListener('keydown', move);

	return (
		<StyledTetris>
			{dropTime === null ? <Instructions /> : null}
			<Stage stage={stage} />
			<aside>
				{gameOver ? (
					<React.Fragment>
						<Card style={{ width: '18rem' }}>
							<Card.Body>Game Over</Card.Body>
						</Card><br />
						<Button variant="primary" onClick={handleStartGame}>Start a new game</Button>
					</React.Fragment>
				) : (
				<div>
					<Card style={{ width: '18rem' }}>
						<Card.Header>Game Status</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>Score: {score}</ListGroup.Item>
							<ListGroup.Item>Rows: {rows}</ListGroup.Item>
							<ListGroup.Item>Level: {level}</ListGroup.Item>
						</ListGroup>
					</Card><br />
					<Button variant="primary" onClick={handleStartGame}>Start a game</Button>
				</div>
				)}
			</aside>
		</StyledTetris>
	);
};

export default Tetris;