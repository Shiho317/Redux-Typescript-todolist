import React from 'react';
import styles from './TaskForm.module.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

type Inputs = {
  taskTitle: string;
}

const TaskForm: React.FC = () => {
  const {register, handleSubmit, reset} = useForm();
  const handleCreate = (data: Inputs) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.root}>
    <Box
      component="form"
      className={styles.form}
      onSubmit={handleSubmit(handleCreate)}
    >
      <TextField id="outlined-basic" label="New Task" variant="outlined" className={styles.text_field} {...register('taskTitle')}/>
      
    </Box>
    </div>
  );
}

export default TaskForm
