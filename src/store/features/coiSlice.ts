import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { COIRecord, COIStatus } from '../../types';
import { mockCOIData } from '../../data/mockData';

interface COIState {
  data: COIRecord[];
}

const initialState: COIState = {
  data: mockCOIData,
};

const coiSlice = createSlice({
  name: 'coi',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<Omit<COIRecord, 'id' | 'createdAt'>>) => {
      const newRecord: COIRecord = {
        ...action.payload,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      };
      state.data.unshift(newRecord);
    },
    updateRecord: (state, action: PayloadAction<COIRecord>) => {
      const index = state.data.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(record => record.id !== action.payload);
    },
    updateStatus: (state, action: PayloadAction<{ id: string; status: COIStatus }>) => {
      const record = state.data.find(r => r.id === action.payload.id);
      if (record) {
        record.status = action.payload.status;
      }
    },
    setInitialData: (state, action: PayloadAction<COIRecord[]>) => {
      state.data = action.payload;
    }
  },
});

export const { addRecord, updateRecord, deleteRecord, updateStatus, setInitialData } = coiSlice.actions;
export default coiSlice.reducer;
