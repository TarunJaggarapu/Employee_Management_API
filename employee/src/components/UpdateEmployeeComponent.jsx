import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class UpdateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      department: "",
      mail: "",
      phone: "",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeDeptHandler = this.changeDeptHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      let employee = res.data;
      this.setState({
        name: employee.name,
        department: employee.department,
        mail: employee.mail,
        phone: employee.phone,
      });
    });
  }

  updateEmployee = (e) => {
    e.preventDefault();
    let employee = {
      id: this.state.id,
      name: this.state.name,
      department: this.state.department,
      mail: this.state.mail,
      phone: this.state.phone,
    };
    console.log("employee => " + JSON.stringify(employee));
    console.log("id => " + JSON.stringify(this.state.id));
    EmployeeService.updateEmployee(employee).then((res) => {
      this.props.history.push("/employees");
    });
  };

  changeFirstNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeDeptHandler = (event) => {
    this.setState({ department: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ mail: event.target.value });
  };

  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };
  cancel() {
    this.props.history.push("/employees");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Update Employee</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Name: </label>
                    <input
                      placeholder="Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Department: </label>
                    <input
                      placeholder="Department"
                      name="dept"
                      className="form-control"
                      value={this.state.department}
                      onChange={this.changeDeptHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email Id: </label>
                    <input
                      placeholder="Email Address"
                      name="emailId"
                      className="form-control"
                      value={this.state.mail}
                      onChange={this.changeEmailHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Phone: </label>
                    <input
                      placeholder="Phone"
                      name="phone"
                      className="form-control"
                      value={this.state.phone}
                      onChange={this.changePhoneHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.updateEmployee}
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

export default UpdateEmployeeComponent;
