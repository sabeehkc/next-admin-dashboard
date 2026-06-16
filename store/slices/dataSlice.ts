import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clients, projects, recentTransactions } from '@/lib/data/mock-data';

export interface Client {
  id: string;
  name: string;
  billing: number;
  received: number;
  outstanding: number;
  status: 'ACTIVE' | 'INACTIVE';
}

interface DataState {
  clients: Client[];
  projects: typeof projects;
  recentTransactions: typeof recentTransactions;
}

const initialState: DataState = {
  clients: clients as Client[],
  projects,
  recentTransactions,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<Omit<Client, 'id'>>) => {
      const newId = `CL-${String(state.clients.length + 1).padStart(2, '0')}`;
      state.clients.push({ ...action.payload, id: newId });
    },
    updateClient: (state, action: PayloadAction<Client>) => {
      const index = state.clients.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    deleteClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter((c) => c.id !== action.payload);
    },
    addProject: (state, action: PayloadAction<typeof projects[0]>) => {
      state.projects.push(action.payload);
    },
  },
});

export const { addClient, updateClient, deleteClient, addProject } = dataSlice.actions;
export default dataSlice.reducer;
