import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const contactsInitialState = {
   items: [],
   isLoading: false,
   error: null
}

const handleOnPending = state => {
   state.isLoading = true;
}

const handleOnReject = (state, action) => {
   state.isLoading = false;
   state.error = action.payload;
}

export const contactsSlice = createSlice({
   name: 'contacts',
   initialState: contactsInitialState,
   extraReducers: builder => {
      builder
         .addCase(fetchContacts.pending, handleOnPending)
         .addCase(fetchContacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
            state.error = null;
         })
         .addCase(fetchContacts.rejected, handleOnReject)
         .addCase(addContact.pending, handleOnPending)
         .addCase(addContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items.push(action.payload);
            state.error = null;
         })
         .addCase(addContact.rejected, handleOnReject)
         .addCase(deleteContact.pending, handleOnPending)
         .addCase(deleteContact.fulfilled, (state, action) => {
            const index = state.items.findIndex(contact => contact.id === action.payload.id);
            state.isLoading = false;
            state.items.splice(index, 1);
            state.error = null;
         })
         .addCase(deleteContact.rejected, handleOnReject)
   }
});

export const contactsReducer = contactsSlice.reducer;