import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> View Employee Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Employee ID: </label>
              <div> {this.state.employee.id}</div>
            </div>
            <div className="row">
              <label> Employee Name: </label>
              <div> {this.state.employee.name}</div>
            </div>
            <div className="row">
              <label> Employee Department: </label>
              <div> {this.state.employee.department}</div>
            </div>
            <div className="row">
              <label> Employee Email ID: </label>
              <div> {this.state.employee.mail}</div>
            </div>
            <div className="row">
              <label> Employee Phone: </label>
              <div> {this.state.employee.phone}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewEmployeeComponent;
