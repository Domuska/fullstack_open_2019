import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
  <>
    <h1>{props.course}</h1>
  </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.text} {props.excercises}</p>
    </>
  )
}

const Content = (props) => {
  return(
    <>
      <Part text={props.text} excercises={props.excercises}></Part>
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
  const course = 'Half Stack application development';
  const content = [ 
    {
      title: 'Fundamentals of React',
      excercises: 10,
    },
    {
      title: 'Using props to pass data',
      excercises: 7,
    },
    {
      title: 'State of a component',
      excercises: 14,
    },
  ];
  /*
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  */
 // todo jatka tästä niin että Content komponentille menee taulu, propsina,
 // ja siellä hardkoodattuna otetaan vaan taulusta elementit 0, 1, 2 ja niitten
 // title & excercises passataan part komponentille


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