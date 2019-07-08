import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
  <>
    <h1>{props.course}</h1>
  </>
  )
}

const Content = (props) => {
  return(
    <>
      <p>{props.text} {props.excercises}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of excercises total: {props.excNum}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content text={part1} excercises={exercises1}/>
      <Content text={part2} excercises={exercises2}/>
      <Content text={part3} excercises={exercises3}/>
      <Total excNum={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))