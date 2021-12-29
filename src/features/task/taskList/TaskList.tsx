import React from 'react';
import styles from './TaskList.module.scss';
import TaskItem from '../taskItem/TaskItem';

import sampleData from './sampleData.json';

const TaskList:React.FC = () => {
  return (
    <div className={styles.root}>
      {sampleData.map((task) => {
        <TaskItem key={task.id} task={task}/>
      })}
    </div>
  )
}

export default TaskList
