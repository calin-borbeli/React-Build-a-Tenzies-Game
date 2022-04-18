import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
	const [dice, setDice] = React.useState(allNewDice());

	const [tenzies, setTenzies] = React.useState(false);

	React.useEffect(() => {
		if (dice.every((die) => die.isHeld && die.value === dice[0].value)) {
			setTenzies(true);
		}
	}, [dice]);

	function allNewDice() {
		const newDiceArray = [];
		for (let i = 0; i < 10; i++) {
			newDiceArray.push({
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid(),
			});
		}
		return newDiceArray;
	}

	const rollDice = () => {
		if (tenzies) {
			setTenzies(false);
			setDice(allNewDice());
		} else {
			setDice((oldDice) => {
				return oldDice.map((die) => {
					return die.isHeld
						? die
						: { ...die, value: Math.ceil(Math.random() * 6) };
				});
			});
		}
	};
	const holdDice = (id) =>
		setDice((oldDice) => {
			return oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			});
		});

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	return (
		<div className="App">
			{tenzies && <Confetti />}
			<main>
				<h1 className="title">Tenzies</h1>
				<p className="instructions">
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</p>
				<div className="dice-container">{diceElements}</div>
				<button className="roll-dice" onClick={rollDice}>
					{tenzies ? "New Game" : "Roll"}
				</button>
			</main>
		</div>
	);
}

export default App;
