import React,{useState,useEffect} from "react";
import { useNavigate,Link} from "react-router-dom";
import api from "../api/contact";

export default function UpdateContact(props)
{
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [name, setname] = useState('');

  // Step 2: Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addContactHandler({
      name:name,
      email:email,
    })
    
    navigate('/')
  };

 

  // Step 3: Create the form using JSX
  return (
    <div>
     
      <h2 className="text-center">Add Contact</h2>
        <Link to="/" className="btn btn-primary">Go To List</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={e => setname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary my-5">Submit</button>
        </div>
      </form>
    </div>
  );  
  
}