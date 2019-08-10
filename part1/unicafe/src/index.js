import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calcTotal = () => {
    return good + neutral + bad;
  }

  const calcAverage = () => {
    const total = calcTotal();
    if (total > 0) {
      const badScore = bad * -1;
      const goodScore = good;
      // neutral votes are worth 0
      return (goodScore + badScore) / total;
    }
    return 'No votes registered';
  }

  const calcPositivePercentage = () => {
    const total = calcTotal();
    if (total > 0) {
      return `${good / total * 100}%`;
    }
    return 'No votes registered';
  }

  const onClickFactory = (type) => {
    if (type === 'good') return () => setGood(good + 1);
    if (type === 'neutral') return () => setNeutral(neutral + 1);
    if (type === 'bad') return () => setBad(bad + 1);
    throw new Error('Unknown button type, use either "good", "neutral" or "bad"');
  }

  return (
    <div>
      <h1>Unicafe feedback system</h1>
      <h2>Give feedback, push button. Pls.</h2>
      <Button onClick={onClickFactory('good')} text="good"></Button>
      <Button onClick={onClickFactory('neutral')} text="neutral"></Button>
      <Button onClick={onClickFactory('bad')} text="bad"></Button>

      <h2>Results</h2>
      <p>Good votes: {good}</p>
      <p>Good votes: {neutral}</p>
      <p>Good votes: {bad}</p>
      <br></br>
      <p>Votes total: {calcTotal()}</p>
      <p>Average score: {calcAverage()}</p>
      <p>Amount positive: {calcPositivePercentage()}</p>
    </div>
  )
};

ReactDOM.render(<App />, 
  document.getElementById('root')
);