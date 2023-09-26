import React from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import { Link} from "react-router-dom";

export default function ContactCard(props) {
const deleteHandler = (email) => {
Swal.fire({
title: 'Do you want to save the changes?',
showDenyButton: true,
showCancelButton: true,
confirmButtonText: 'Save',
denyButtonText: `Don't save`,
}).then((result) => {
/* Read more about isConfirmed, isDenied below */
if (result.isConfirmed) {
props.deleteContact(email);
} else if (result.isDenied) {
Swal.fire('Changes are not saved', '', 'info')
}
})

};

const { id,name, email } = props.contact;

const index = props.index;
let id_btn = "delete_btn_" + index + 1;
return (
<tr>
    <th scope="row">{index + 1}</th>
    <td>{name}</td>
    <td>{email}</td>
    {/* <td><button className="btn btn-danger" id={id_btn} data-name={index+1}
            onClick={()=>deleteHandler(id_btn)}>{window.icons.delete}</button></td> */}
    <td>
        <button className="btn btn-danger" onClick={()=> deleteHandler(id)}>
            {window.icons.delete}
        </button>
        <Link  to={`/contact/details/${id}`} state={{ contact: props.contact }} className="btn btn-primary ms-2">Details</Link>
        <Link  to={`/contact/update/${id}`} state={{ contact: props.contact }} className="btn btn-primary ms-2">Update</Link>
    </td>
</tr>
);
}
