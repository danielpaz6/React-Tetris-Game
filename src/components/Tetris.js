import React from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { createStage } from "../gameHelpers";

const tetris = () => {

	return (
		<div>
			<Stage stage={createStage()} />
			<aside>
				<div>
					<Display text="Score" />
					<Display text="Rows" />
					<Display text="Level" />
				</div>
			</aside>
		</div>
	);
};

export default tetris;