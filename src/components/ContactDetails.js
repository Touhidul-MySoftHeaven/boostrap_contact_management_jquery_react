import React from "react";
import { useLocation,useNavigate} from "react-router-dom";

function ContactDetails(props)
{
const location = useLocation();
const navigate = useNavigate();
const { id,name, email } = location.state.contact;
const goBack = () => {
    navigate(-1);
}
return(
<div>
<table className="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1</th>
            <td>{name}</td>
            <td>{email}</td>
        </tr>
        
    </tbody>
</table>

<button onClick={goBack} className="btn btn-primary">Back</button>

</div>

)
}
export default ContactDetails;
