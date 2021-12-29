import React from 'react';
import styles from './TaskItem.module.scss';
import Checkbox from '@mui/material/Checkbox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface PropTypes {
  task: {id: number, title: string, completed: boolean};
}

const TaskItem: React.FC<PropTypes> = ({task}) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon/>
        <div className={styles.title_text}>
          {task.title}
        </div>
      </div>
      <div className={styles.right_item}>
        <Checkbox {...label} 
        checked={task.completed}
        onClick={() => {
        console.log(`check ${task.id}`)
        }}
        className={styles.checkBox}/>

        <button onClick={() => {
        console.log(`edit ${task.id}`)
        }}
        className={styles.edit_btn}>
          <EditIcon className={styles.edit_icon}/>
        </button>

        <button onClick={() => {
        console.log(`delete ${task.id}`)
        }}
        className={styles.delete_btn}>
          <DeleteIcon className={styles.delete_icon}/>
        </button>

      </div>
      
    </div>
  );
}

export default TaskItem
