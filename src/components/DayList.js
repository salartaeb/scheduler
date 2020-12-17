import React from "react";
import DayListItem from './DayListItem';

export default function DayList(props) {
  const schedule = props.days.map(value => {
 
    return (
      <DayListItem
        key={value.id}
        selected={value.name === props.day}
        setDay={props.setDay}
        {...value}
      />
    )
  })
  return <ul>{schedule}</ul>
}