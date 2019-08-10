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
      <p>{props.content.title} {props.content.excercises}</p>
    </>
  )
}

const Content = (props) => {
  return(
    <>
      <Part content={props.contentsData[0]}></Part>
      <Part content={props.contentsData[1]}></Part>
      <Part content={props.contentsData[2]}></Part>
    </>
  )
}

const Total = (props) => {
  let totalExcercises = 0;
  props.contentsData.forEach(element => {
    totalExcercises += element.excercises;  
  });

  return (
    <>
      <p>Number of excercises total: {totalExcercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [ 
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
    ]
  };
  
  return (
    <div>
      <Header course={course.name}/>
      <Content contentsData={course.parts}/>
      <Total contentsData={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))