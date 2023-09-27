import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Redirect 
} from "react-router-dom";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import $ from "jquery";
import Swal from "sweetalert2";
import ContactDetails from "./ContactDetails";
import api from '../api/contact';
import UpdateContact from "./UpdateContact"

function App() {

  const LOCAL_STORAGE_KEY="contacts";
  const [contacts, setcontacts] = useState([]);
  const [searchKeyword,setsearchKeyword]=useState("");
  const [searchResult,setsearchResult]=useState([]);
  
  const searchFunction=(searchKeyword)=>{
       setsearchKeyword(searchKeyword);
       if(searchKeyword !=="")
       {
         const searchResultAfterFilter=contacts.filter((contact)=>{
          return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
         })
         setsearchResult(searchResultAfterFilter);
       }else
       {
        setsearchResult(contacts);
       }
  }
 



  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };  
  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setcontacts(retriveContacts);
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setcontacts(allContacts);
    };

    getAllCOntacts();
  }, []);

    // const retriveContacts=localStorage.getItem(LOCAL_STORAGE_KEY);
    // console.log(retriveContacts);
    // console.log(retriveContactsfromAPi());
    // let parsedJsonContacts = [];
    // if (retriveContacts) {
    //   parsedJsonContacts = JSON.parse(retriveContacts);
    // }
   

  
  const addContactHandler =async (contact) => {
    var flag = true;
    $.each(contacts, function (key, value) {
      if (value.email == contact.email) {
        Swal.fire("Email Already in the List");
        flag = false;
        return;
      }
    });
    if (flag) {
      const request = {
        id: uuid(),
        ...contact,
      };
  
      const response = await api.post("/contacts", request);
      setcontacts([...contacts, response.data]);
      
    }
  };
  const deleteContact =async (id) => {
    await api.delete(`/contacts/${id}`);
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(filteredContacts);
  };
  const updateContactHandler = async (contact) => {
  
    var flag = true;
    $.each(contacts, function (key, value) {
      if (value.id != contact.id ) {
        if(value.email == contact.email)
        {
          Swal.fire("Email Already in the List");
          flag = false;
          return;
        }
        
      }
    });
    if (flag) {
      const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setcontacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
    }
  };
 



  return (
    <div className="container">
      <Router>
      <Header />
      {/* <AddContact addContactHandler={addContactHandler}></AddContact> */}
        <Routes>
        <Route
            path="/"
            Component={() => (
              <ContactList contactList={searchKeyword.length < 1 ? contacts : searchResult} deleteContact={deleteContact} searchKeyword={searchKeyword} searchFunction={searchFunction}/>
            )}
          />
          <Route
            path="/add"
            Component={() => (
              <AddContact addContactHandler={addContactHandler}></AddContact>
            )}
          />

          <Route
            path="/contact/details/:id"
            Component={() => <ContactDetails />}
          />

           <Route
            path="/contact/update/:id"
            Component={() => <UpdateContact updateContactHandler={updateContactHandler}/>}
          />
        </Routes>
      </Router>
     
      
      
    </div>
  );
}

export default App;
