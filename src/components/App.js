import React, { useState } from "react";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import $ from "jquery";
import Swal from "sweetalert2";

function App() {
  // const contacts = [
  //   {
  //     id: 1,
  //     name: "abm",
  //     email: "abm@mail.com",
  //   },
  //   {
  //     id: 2,
  //     name: "abm1",
  //     email: "abm1@mail.com",
  //   },
  //   {
  //     id: 3,
  //     name: "abm2",
  //     email: "abm2@mail.com",
  //   },
  //   {
  //     id: 4,
  //     name: "abm3",
  //     email: "abm3@mail.com",
  //   },
  // ];
  const [contacts, setcontacts] = useState([]);
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
      setcontacts([...contacts, contact]);
      console.log(contact);
    }
  };
  const deleteContact = (email) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.email !== email;
    });
    setcontacts(filteredContacts);
  };

  return (
    <div className="container">
      <Header />

      <AddContact addContactHandler={addContactHandler}></AddContact>
      <ContactList contactList={contacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
