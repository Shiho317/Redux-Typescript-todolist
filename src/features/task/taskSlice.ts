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
  },
});

export const { createTask } = taskSlice.actions;

export const selectTask = (state: RootState): TaskState['tasks'] => state.task.tasks;

export default taskSlice.reducer;
