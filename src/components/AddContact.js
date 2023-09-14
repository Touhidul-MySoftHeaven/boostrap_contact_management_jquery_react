import React from "react";
import Swal from "sweetalert2";

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
    this.handleFromSubmit = this.handleFromSubmit.bind(this);
  }

  handleFromSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      Swal.fire("Any fool can use a computer");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Add Contact</h2>
        <form onSubmit={this.handleFromSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <button className="btn btn-primary">Add</button>
        </form>
      </div>
    );
  }
}
export default AddContact;
