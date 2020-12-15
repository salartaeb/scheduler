import React, {Fragment} from 'react';
import './styles.scss'
import classnames from 'classnames';
import Header from "./Header.js"
import Empty from "./Empty.js"
import Show from "./Show.js"

export default function Appointment(props) {
 
  return (
    <>
    <article className="appointment"></article>
    <div className="appointment">
      <Header time={props.time}/>
      { props.interview ? 
        <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : 
        <Empty />
      }
    </div>
    </>
  )
}