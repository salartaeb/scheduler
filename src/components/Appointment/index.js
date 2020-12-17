import React, {Fragment} from 'react';
import './styles.scss'
import classnames from 'classnames';
import Form from 'components/Appointment/Form';
import Header from "./Header.js"
import Empty from "./Empty.js"
import Show from "./Show.js"

import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

 
  return (
    <>
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && (<Empty onAdd={transition}/>)}
      {mode === SHOW && (
        <Show student={props.interview.student} interviewer={props.interview.interviewer}/>
      )}
  {mode === CREATE && <Form name={props.name} value={props.value} interviewers={props.interviewers} onCancel={back}/>}
    </article>
    </>
  )
}