import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TaskItem.module.scss';
import Checkbox from '@mui/material/Checkbox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import TaskForm from '../taskForm/TaskForm';
import { selectTask, handleModalOpen, selectIsModalOpen, completeTask, deleteTask } from '../taskSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface PropTypes {
  task: {id: number, title: string, completed: boolean};
}

const TaskItem: React.FC<PropTypes> = ({task}) => {

  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => dispatch(handleModalOpen(false));

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
        dispatch(completeTask(task))
        }}
        className={styles.checkBox}/>

        <button onClick={() => {
        console.log(`edit ${task.id}`)
        }}
        className={styles.edit_btn}>
          <EditIcon className={styles.edit_icon} onClick={handleOpen}/>
        </button>

        <button onClick={() => {
          dispatch(deleteTask(task));
        }}
        className={styles.delete_btn}>
          <DeleteIcon className={styles.delete_icon}/>
        </button>

      </div>

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit Task Title</div>
          <div className={styles.input}>
            <TaskForm edit/>
          </div>
        </div>
      </Modal>
      
    </div>
  );
}

export default TaskItem
