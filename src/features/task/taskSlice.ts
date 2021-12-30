import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from '@testing-library/react';
import { RootState, AppThunk } from '../../app/store';
import { db } from '../../firebase';
import firebase from "firebase/compat/app";

interface TaskState {
  idCount: number;
  tasks: {id: string; title: string; completed:boolean}[];
  selectedTask: {id: string; title: string; completed:boolean};
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [],
  selectedTask: {id: '', title: '', completed: false},
  isModalOpen: false,
};

export const fetchTasks = createAsyncThunk('task/getAllTasks', async() => {
  const res = await db.collection('tasks').orderBy('dateTime', 'desc').get();

  const allTasks = res.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    completed: doc.data().completed,
  }));

  const taskNumber = allTasks.length;
  const passData = { allTasks, taskNumber };
  return passData
});

export const createTask = async(title: string):Promise<void> => {
  try{
    const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
    await db.collection('tasks').add({title: title, completed: false, dateTime: dateTime})

  }catch(err){
    console.log('error')
  }
};

export const editTask = async(submitData: {id: string; title: string; completed: boolean;}):Promise<void> => {
  const {id, title, completed} = submitData;
  const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
  try{
    await db.collection('tasks').doc(id).set({title, completed, dateTime}, {merge: true});
  }catch(err){
    console.log('error')
  }
};

export const deleteTask = async(id:string):Promise<void> => {
  try{
    await db.collection('tasks').doc(id).delete();
  }catch(err){
    console.log('error')
  }
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    

    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.allTasks;
      state.idCount = action.payload.taskNumber;
    });
  },
});

export const { handleModalOpen, selectTask } = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState['tasks'] => state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] => state.task.isModalOpen;

export const selectSelectedTask = (state: RootState): TaskState['selectedTask'] => state.task.selectedTask;

export default taskSlice.reducer;
