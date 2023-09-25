import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import $ from "jquery";
import Swal from "sweetalert2";

function App() {

  const LOCAL_STORAGE_KEY="contacts";
 
    const retriveContacts=localStorage.getItem(LOCAL_STORAGE_KEY);
    let parsedJsonContacts = [];
    if (retriveContacts) {
      parsedJsonContacts = JSON.parse(retriveContacts);
    }

  const [contacts, setcontacts] = useState(parsedJsonContacts);
  const addContactHandler = (contact) => {
    var flag = true;
    $.each(contacts, function (key, value) {
      if (value.email == contact.email) {
        Swal.fire("Email Already in the List");
        flag = false;
        return;
      }
    });
    if (flag) {
      setcontacts([...contacts, {id:uuid(),...contact}]);
      console.log(contact);
    }
  };
  const deleteContact = (email) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.email !== email;
    });
    setcontacts(filteredContacts);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);



  return (
    <div className="container">
      <Router>
      <Header />
      {/* <AddContact addContactHandler={addContactHandler}></AddContact> */}
        <Routes>
        <Route
            path="/"
            Component={() => (
              <ContactList contactList={contacts} deleteContact={deleteContact} />
            )}
          />
          <Route
            path="/add"
            Component={() => (
              <AddContact addContactHandler={addContactHandler}></AddContact>
            )}
          />
        </Routes>
      </Router>
     
      
      
    </div>
  );
}

export default App;
