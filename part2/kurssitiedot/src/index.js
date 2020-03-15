import React from 'react'
import ReactDOM from 'react-dom'

import Course from './components/course';



const App = () => {

    const getCourses = () => courses.map(course => 
      <Course
        course={course}
        key={course.id}
      >
      </Course>
    );

    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ];
  
  return (
      <div>
        <h1>Course offering</h1>
        {getCourses()}
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))