import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TaskForm.module.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { createTask, editTask, handleModalOpen, selectSelectedTask } from '../taskSlice';

type Inputs = {
  taskTitle: string;
}

type PropTypes = {
  edit?: boolean;
}

const TaskForm: React.FC<PropTypes> = ({edit}) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);
  const {register, handleSubmit, reset} = useForm();

  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle));
    reset();
  };

  const handleEdit = (data: Inputs) => {
    const sendData = {...selectedTask, title: data.taskTitle};
    dispatch(editTask(sendData));
    dispatch(handleModalOpen(false));
  };

  return (
    <div className={styles.root}>
    <Box
      component="form"
      className={styles.form}
      onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
    >
      <TextField id="outlined-basic" defaultValue={edit ? selectedTask.title : ''} label={edit ? "Edit Task" : "New Task"} variant="outlined" className={styles.text_field} {...register('taskTitle')}/>
      
      {edit ? (
      <div className={styles.button}>
        <button type='submit' className={styles.button_submit}>submit</button>
        <button type='button' onClick={() => dispatch(handleModalOpen(false))} className={styles.button_cancel}>cancel</button>
      </div> 
      ) : null}
    </Box>
    </div>
  );
}

export default TaskForm
