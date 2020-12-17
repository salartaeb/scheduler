import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';



export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
          {
            props.interviewers.map((value, index) => {
              return (
                <InterviewerListItem
                  key={value.id}
                  name={value.interviewer}
                  avatar={value.avatar}
                  selected={value.id === props.value}
                  onChange={e => props.onChange(value.id)}
        
                />
              )
            })
          }

      </ul>
    </section>
  )
}