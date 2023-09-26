import React,{useState,useEffect} from "react";
import { useLocation,Link,useNavigate} from "react-router-dom";
import api from "../api/contact";

export default function UpdateContact(props)
{
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [id, setid] = useState(location.state.contact.id);
  const [name, setname] = useState('');

  const retrieveContactsBYID = async () => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  };
  useEffect(() => {
    const getSingleContact = async () => {
      const contactByID = await retrieveContactsBYID();
      if (contactByID)
      {
       setemail(contactByID.email);
       setname(contactByID.name);
      }
    };
    getSingleContact();
  }, []);

  


  // Step 2: Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateContactHandler({
      id:id,
      name:name,
      email:email,
    })
    navigate('/') 
  };

 

  // Step 3: Create the form using JSX
  return (
    <div>
     
      <h2 className="text-center">update Contact</h2>
        <Link to="/" className="btn btn-primary">Go To List</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="hidden" name="id" value={id} />
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