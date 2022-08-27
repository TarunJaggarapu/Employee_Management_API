import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "34.132.124.75";

class EmployeeService {

    getEmployees() {
        const url = EMPLOYEE_API_BASE_URL + 'employees';
        return axios.get(url);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/employee', employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + 'employee/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/employee', employee);
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + 'employee/' + employeeId);
    }
}

export default new EmployeeService()