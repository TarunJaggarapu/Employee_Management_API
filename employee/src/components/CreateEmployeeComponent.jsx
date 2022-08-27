import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      department: "",
      mail: "",
      phone: "",
    };
    this.changenameHandler = this.changenameHandler.bind(this);
    this.changedepartmentHandler = this.changedepartmentHandler.bind(this);
    this.changephoneHandler = this.changephoneHandler.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
  }

  saveEmployee = (e) => {
    e.preventDefault();
    let employee = {
      name: this.state.name,
      department: this.state.department,
      mail: this.state.mail,
      phone: this.state.phone,
    };
    console.log("employee => " + JSON.stringify(employee));
    EmployeeService.createEmployee(employee).then((res) => {
      this.props.history.push("/employees");
    });
  };

  changenameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changedepartmentHandler = (event) => {
    this.setState({ department: event.target.value });
  };

  changemailHandler = (event) => {
    this.setState({ mail: event.target.value });
  };

  changephoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };
  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    return <h3 className="text-center">Add Employee</h3>;
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Name: </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changenameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Department: </label>
                    <input
                      placeholder="Department"
                      name="department"
                      className="form-control"
                      value={this.state.department}
                      onChange={this.changedepartmentHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email Id: </label>
                    <input
                      placeholder="Email Address"
                      name="emailId"
                      className="form-control"
                      value={this.state.mail}
                      onChange={this.changemailHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Phone: </label>
                    <input
                      placeholder="Phone Number"
                      name="phone"
                      className="form-control"
                      value={this.state.phone}
                      onChange={this.changephoneHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveEmployee}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEmployeeComponent;
