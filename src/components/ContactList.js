import React from "react";
import ContactCard from "./ContactCard";

export default function ContactList(props) {

  const renderContactList = props.contactList.map((contact,index) => {
    return (
      <ContactCard contact={contact} index={index} deleteContact={props.deleteContact}></ContactCard>
    );
  });

  return (
    <div className="col-md-12">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>  
          </tr>
        </thead>
        <tbody>{renderContactList}</tbody>
      </table>
    </div>
  );
}
