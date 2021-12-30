import React from 'react';
import styles from './TaskList.module.scss';
import TaskItem from '../taskItem/TaskItem';
import { selectTasks } from '../taskSlice';
import { useSelector } from 'react-redux';

const TaskList:React.FC = () => {
  const tasks = useSelector(selectTasks);
  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task}/>
      ))}
    </div>
  )
}

export default TaskList
