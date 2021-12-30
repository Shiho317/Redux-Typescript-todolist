import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TaskItem.module.scss';
import Checkbox from '@mui/material/Checkbox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import TaskForm from '../taskForm/TaskForm';
import { selectTask, handleModalOpen, selectIsModalOpen, deleteTask, editTask, fetchTasks } from '../taskSlice';
import { AppDispatch } from '../../../app/store';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface PropTypes {
  task: {id: string, title: string, completed: boolean};
}

const TaskItem: React.FC<PropTypes> = ({task}) => {

  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch: AppDispatch = useDispatch();

  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => dispatch(handleModalOpen(false));

  const handleEdit = async(id: string, title:string, completed: boolean) => {
    const sendData = {id, title, completed: !completed};
    await editTask(sendData);
    dispatch(fetchTasks());
  };

  const handleDelete = async(id: string) => {
    await deleteTask(id);
    dispatch(fetchTasks());
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon/>
        <div className={styles.title_text}>
          {task.title}
        </div>
      </div>
      <div className={styles.right_item} >
        <Checkbox {...label} 
        checked={task.completed}
        onClick={() => handleEdit(task.id, task.title, task.completed)}
        className={styles.checkBox}/>

        <button onClick={handleOpen}
        className={styles.edit_btn}>
          <EditIcon className={styles.edit_icon}/>
        </button>

        <button onClick={() => {
          handleDelete(task.id);
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
