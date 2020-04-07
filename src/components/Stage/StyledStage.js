import styled from 'styled-components';

export const StyledStage = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${props => props.height},
		25px
	);
	grid-template-columns: repeat(${props => props.width}, 25px);
	grid-gap: 1px;
	border: 2px solid #ccc;
	border-radius: 4px;
	max-width: calc(25px * ${props => props.width} + 15);
	background: #eee;
`;