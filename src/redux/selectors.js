import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
const selectContacts = state => state.contacts.items;
const selectSearchValue = state => state.search;

export const selectVisibleContacts = createSelector(
   [selectContacts, selectSearchValue],
   (contacts, searchValue) => {
      return contacts.filter(contact => contact.name.toLowerCase().includes(searchValue.toLowerCase()));
   }
);
