import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectError, selectVisibleContacts } from "../../redux/selectors";
import { ContactItem } from "../ContactItem/ContactItem";
import { fetchContacts } from "../../redux/operations";

export const ContactList = () => {
   const dispatch = useDispatch();
   const isLoading = useSelector(selectIsLoading);
   const error = useSelector(selectError);
   const contacts = useSelector(selectVisibleContacts);
   
   useEffect(() => {
      dispatch(fetchContacts());
   }, [dispatch]);
   
   return (
      <>
         { isLoading && <div style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: "20px",
            fontWeight: "600"
         }}>Loading...</div> }

         { error && <div>{error}</div> }
         { !isLoading && !error && contacts.length <= 0 && 
            <div style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: "20px",
            fontWeight: "500"
            }}>No contacts yet, try adding one!</div>}
         { !isLoading && contacts.length > 0 &&
            <ul>
               {
                  contacts.map(contact => (
                     <ContactItem
                        key={contact.id}
                        contact={contact}
                     />
                  ))
               }
            </ul>
         }
      </>
      
   );
}