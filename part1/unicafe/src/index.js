import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
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

      <h2>Results</h2>
      <p>Good votes: {good}</p>
      <p>Good votes: {neutral}</p>
      <p>Good votes: {bad}</p>
    </div>
  )
};

ReactDOM.render(<App />, 
  document.getElementById('root')
);