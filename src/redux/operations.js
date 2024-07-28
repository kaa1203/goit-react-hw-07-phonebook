import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://66a1e185967c89168f1de249.mockapi.io/';

export const fetchContacts = createAsyncThunk(
   "contacts/fetchAll", 
   async (_, thunkApi) => {
      try {
         const res = await axios.get('contacts');
         return res.data;
      } catch (error) {
         return thunkApi.rejectWithValue(error.message);
      }
   }
);

export const addContact = createAsyncThunk(
   "contacts/addContact",
  async ({ name, number }, thunkApi) => {
      try {
         const res = await axios.post('/contacts', {name, number});
         return res.data;
      } catch (error) {
         return thunkApi.rejectWithValue(error.message);
      }
   }
);

export const deleteContact = createAsyncThunk(
   "contacts/deleteContact",
   async (contactId, thunkApi) => {
      try {
         const res = await axios.delete(`/contacts/${contactId}`);
         return res.data;
      } catch (error) {
         return thunkApi.rejectWithValue(error.message);
      }
   }
)