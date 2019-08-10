import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Statistics = (props) => {

  const calcTotal = () => {
    return props.votes.good + props.votes.neutral + props.votes.bad;
  }

  const calcAverage = () => {
    const total = calcTotal();
    if (total > 0) {
      const badScore = props.votes.bad * -1;
      const goodScore = props.votes.good;
      // neutral votes are worth 0
      return (goodScore + badScore) / total;
    }
    return 'No votes registered';
  }

  const calcPositivePercentage = () => {
    const total = calcTotal();
    if (total > 0) {
      return `${props.votes.good / total * 100}%`;
    }
    return 'No votes registered';
  }

  if (calcTotal() > 0){
    return (
      <>
        <h2>Results</h2>
        <StatsRow text="Good:" value={props.votes.good}></StatsRow>
        <StatsRow text="Neutral:" value={props.votes.neutral}></StatsRow>
        <StatsRow text="Bad:" value={props.votes.bad}></StatsRow>
        <br></br>
        <StatsRow text="Votes total:" value={calcTotal()}></StatsRow>
        <StatsRow text="Average score:" value={calcAverage()}></StatsRow>
        <StatsRow text="Amount positive:" value={calcPositivePercentage()}></StatsRow>
      </>
    )
  }
  return null; 
};

const StatsRow = (props) => <p>{props.text} {props.value}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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

      <Statistics votes={ {good, neutral, bad} }></Statistics>

    </div>
  )
};

ReactDOM.render(<App />, 
  document.getElementById('root')
);