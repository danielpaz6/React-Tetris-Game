import { useState, useEffect } from 'react';
import { createStage } from "../utils/gameHelpers";

export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage());
	const [rowsCleared, setRowsCleared] = useState(0);

	useEffect(() => {
		setRowsCleared(0);

		const sweepRows = newStage =>
			newStage.reduce((accumilator, row) => {
				// If true, we haven't found a value of zero.
				// Therefore it's a full row and it should be cleared.
				if(row.findIndex(cell => cell[0] === 0) === -1) {
					//console.log("Activate findIndex Reduce", row, accumilator);
					setRowsCleared(prev => prev + 1);

					// The accumilator is the new array we building up inside the reduce function.
					// unshift function let us add a new value to the array at the beginning of the array
					// that's what will create the illusion of pushing the game down
					accumilator.unshift(new Array(newStage[0].length).fill([0, 'clear']));
				}
				else
					accumilator.push(row)

				return accumilator;
			}, []);

		const updateStage = prevStage => {
			// First flush the stage
			const newStage = prevStage.map(row => 
				row.map(cell => (
					cell[1] === 'clear' ? [0, 'clear'] : cell
				))
			)

			// Then draw the tetromino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if(value !== 0 ) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? 'merged' : 'clear'}`
						]
					}
				});
			});

			// Then check if we collided
			if(player.collided) {
				resetPlayer();
				return sweepRows(newStage);
			}

			return newStage;
		};

		setStage(prev => updateStage(prev));

	}, [player, resetPlayer]);

	return [stage, setStage, rowsCleared];
}