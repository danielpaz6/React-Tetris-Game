export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
	for(let y = 0; y < player.tetromino.length; y++) {
		for(let x = 0; x < player.tetromino[0].length; x++) {
			// 1. Check that we are on actual Tetromino cell
			if(player.tetromino[y][x] !== 0) {
				if(
				// 2. Check that our move is inside the game areas height (y)
				!stage[y + player.pos.y + moveY] || 
				// 3. Check that our move is inside the game areas width (x)
				!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
				// 4. Check that the cell we're moving to isn't set to clear
				stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
				)
					return true;
			}
		}
	}

	return false;
}