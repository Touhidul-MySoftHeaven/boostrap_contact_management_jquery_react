import React,{useRef} from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

export default function ContactList(props) {
  const inputSerach=useRef("");

  const searchHanler=(e)=>{
    props.searchFunction(inputSerach.current.value);
  }

  const renderContactList = props.contactList.map((contact,index) => {
    return (
      <ContactCard contact={contact} index={index} deleteContact={props.deleteContact}></ContactCard>
    );
  });

  return (
    <div>
      <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <Link to='/add' className="btn btn-primary">Go to Add Form</Link>
      </div>
      </div>
      
       <div className="col-md-12 ">
        <input type="text" ref={inputSerach} className="form-control my-5" value={props.searchKeyword} onChange={searchHanler}/>
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
    </div>
   
  );
}
