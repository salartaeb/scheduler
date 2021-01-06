import React, {useEffect} from 'react';
import './styles.scss'
import Status from 'components/Appointment/Status';
import Form from 'components/Appointment/Form';
import Header from "./Header.js"
import Confirm from 'components/Appointment/Confirm';
import Empty from "./Empty.js"
import Show from "./Show.js"
import Error from 'components/Appointment/Error';

import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {

    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }

  }, [mode, transition, props.interview])

  function save(name, interviewer) {
    
    if (name && interviewer) {
      transition(SAVING);

      const interview = {
        student: name,
        interviewer
      };

      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true))
    }
  }

  function remove() {

    if (mode === CONFIRM) {
      transition(DELETING, true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
    } else {
      transition(CONFIRM);      
    }
  }

  function edit() {
    transition(EDIT);
  }
 
  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
          onDelete={remove}
          onEdit={edit}
        />
      )}
      {mode === CREATE && 
        <Form 
          name={props.name} 
          value={props.value} 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
        />}
          {mode === SAVING && <Status message="Saving" />}
          {mode === DELETING && <Status message="Deleting" />}
          {mode === CONFIRM && 
        <Confirm 
          onCancel={back}
          onConfirm={remove}
          message="Are you sure you want to delete this?" 
        />}
      {mode === EDIT &&
        <Form 
          name={props.name ? props.name : props.interview.student}
          value={props.value ? props.value: props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
       {mode === ERROR_SAVE && 
        <Error 
          message="Error: failed to create appointment"
          onClose={back}
        />
      }
      {mode === ERROR_DELETE && 
        <Error 
          message="Error: failed to cancel appointment"
          onClose={back}
        />
      }
    </article>
  )
}