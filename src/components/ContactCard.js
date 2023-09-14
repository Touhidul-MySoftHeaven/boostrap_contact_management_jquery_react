import React from "react";
import $ from "jquery";

export default function ContactCard(props) {
  const deleteHandler = (email) => {
    props.deleteContact(email);
  };

  const { name, email } = props.contact;
  const index = props.index;
  let id_btn = "delete_btn_" + index + 1;
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{name}</td>
      <td>{email}</td>
      {/* <td><button className="btn btn-danger" id={id_btn} data-name={index+1} onClick={()=>deleteHandler(id_btn)}>{window.icons.delete}</button></td> */}
      <td>
        <button className="btn btn-danger" onClick={() => deleteHandler(email)}>
          {window.icons.delete}
        </button>
      </td>
    </tr>
  );
}
