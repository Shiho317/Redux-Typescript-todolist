import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

interface TaskState {
  idCount: number;
  tasks: {id: number; title: string; completed:boolean}[];
  selectedTask: {id: number; title: string; completed:boolean};
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{id: 1, title: 'Task A', completed: false}],
  selectedTask: {id: 0, title: '', completed: false},
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createTask:(state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },

    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);

      if(task){
        task.title = action.payload.title
      }
    },

    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },

    completeTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if(task){
        task.completed = !task.completed;
      };
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id)
    },
  },
});

export const { createTask, editTask, handleModalOpen, selectTask, completeTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState['tasks'] => state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] => state.task.isModalOpen;

export const selectSelectedTask = (state: RootState): TaskState['selectedTask'] => state.task.selectedTask;

export default taskSlice.reducer;
