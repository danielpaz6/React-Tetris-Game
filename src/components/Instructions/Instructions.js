import React from 'react';
import { StyledInstructions } from "./StyledInstructions";

const instructions = () => (
	<StyledInstructions>
		Press <kbd>Space</kbd> to start.

		<p><kbd>&#8678;</kbd> <kbd>&#8680;</kbd> to move right and left.</p>
		<p><kbd>&#8679;</kbd> to rotate the shape.</p>
	</StyledInstructions>
)

export default instructions;