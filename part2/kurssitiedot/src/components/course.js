import React from 'react'

const Header = (props) => {
    return (
    <>
      <h1>{props.course}</h1>
    </>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
        <li>{name} {exercises}</li>
    )
  }
  
  const Content = (props) => {
  
    const parts = () => props.contentsData.map(part => 
        <Part 
          name={part.name} 
          exercises={part.exercises}
          key={part.id}
        >
        </Part>
    );
  
    return(
      <ul>
          {parts()}
      </ul>
    )
  }
  
  const Total = ({contentsData}) => {
    let totalExercises = contentsData.reduce((total, content) => 
      total += content.exercises, 
      0
    );
  
    return (
      <>
        <p>Number of exercises total: {totalExercises}</p>
      </>
    )
  }
  
  const Course = ({course}) => {
  
      return (
          <>
              <Header course={course.name}/>
              <Content contentsData={course.parts}/>
              <Total contentsData={course.parts}/>
          </>
      )
  }

export default Course;