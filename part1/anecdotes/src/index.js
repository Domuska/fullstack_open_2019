import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Quote = (props) => {
  return (
    <>
      <h1>Anecdotes</h1>
      <p>{props.quote}</p>
      <br></br>
      <p>Votes: {props.votes}</p>
    </>
  )
}

const TopVoted = (props) => {
  return (
    <>
      <h1>Most voted quote</h1>
      <p>"{props.quote}"</p>
      <p>Votes: {props.votes}</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const initialVotes = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(initialVotes);
  console.log("votes:", votes);

  function setRandomAnecdote() {
    let newVal;
    // make sure we get a new value, more fun that way
    while(true) {
      newVal = Math.floor((Math.random() * anecdotes.length));
      console.log("new val:", newVal);
      if (newVal !== selected) break;
    }
    setSelected(newVal);
  }

  function voteAnecdote() {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  function getMaxVote() {
    return votes.reduce((value1, value2) => Math.max(value1, value2));
  }

  function getMostVoted() {
    const max = getMaxVote();
    console.log("max:", max);
    const maxIndex = votes.indexOf(max);
    return props.anecdotes[maxIndex];
  }
  
  return (
    <div>
      <Quote quote={props.anecdotes[selected]} votes={votes[selected]}></Quote>
      <Button onClick={setRandomAnecdote} text="Gimme another"/>
      <Button onClick={voteAnecdote} text="Vote!"/>
      <br/>
      <TopVoted quote={getMostVoted()} votes={getMaxVote()}></TopVoted>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)