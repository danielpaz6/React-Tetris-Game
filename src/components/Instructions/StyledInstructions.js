import styled from 'styled-components';

export const StyledInstructions = styled.div`
	position: absolute;
	width: 315px;
	margin-top: 50px;
	padding: 15px;
	text-align: center;
	background: linear-gradient(90deg, 
		rgba(235,236,237,0) 0%,
		rgba(255,255,255,0.9) 50%,
		rgba(235,236,237,0) 100%
	);

	kbd {
		display: inline-block;
		margin: 0 .1em;
		padding: .1em .6em;
		font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
		font-size: 11px;
		line-height: 1.4;
		color: #242729;
		text-shadow: 0 1px 0 #fff;
		background-color: #e1e3e5;
		border: 1px solid #adb3b8;
		border-radius: 3px;
		box-shadow: 0 1px 0 rgba(12,13,14,0.7), 0 0 0 2px #fff inset;
		white-space: nowrap;
	}

	p {
		font-size: 10px;
		margin-top: 30px;
	}
`;