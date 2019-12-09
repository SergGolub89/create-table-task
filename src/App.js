import React from 'react';
import TableLine from './TableLine';
import Buttons from './Buttons';
import HiddenTableForm from './HiddenTableForm';
import HiddenAddColumnForm from './HiddenAddColumnForm';
import Pagination from './Pagination';
import getEmployees, { createEmployee, deleteEmployee, editEmployee } from './api/employees';

class App extends React.Component {
  state = {
    tableHeaders: [
      {checked: '#'}, 
      {_id: 'id' }, 
      {firstName: 'First Name'},
      {lastName: 'Last Name'}, 
      {role: 'Role'}, 
      {businessLocation: 'Business Location'}, 
      {workEmail: 'Work Mail'}, 
      {workPhone: 'Phone'}, 
      {hourlyRate: 'Hourly Rate'}
    ],
    employees: [],
    totalNumberOfData: 0,
    checkedEmployees: [],
    formActive: false,
    inEdition: false,
    onColumnAdding: false,
    activePage: 1,
    employeesPerPage: 5,
  }

  handleCheckboxChange = (id) => {
    this.setState(prevstate => {
      const togledEmployees = prevstate.employees.map(employee => {
        if (employee._id !== id) {
          return employee;
        } else {
          return {
            ...employee,
            checked: !employee.checked,
          }
        }
      })

      return {
        employees: togledEmployees,
        checkedEmployees: togledEmployees.filter(employee => employee.checked === true)
      }
    })
  }

  handleDeleteEmployee = () => {
    const id = this.state.checkedEmployees.map(item => item._id);

    if (id.length > 1) {
      for(let i = 0; i < id.length; i++) {
        deleteEmployee(id[i])
        .then(res => {
          const filteredEmployees = this.state.employees.filter(employee => employee._id !== id[i]);
          this.setState({
            employees: filteredEmployees,
          })
        })
        .catch(err => {
          console.log(err)
        })
      }
    } else {
      deleteEmployee(id)
      .then(res => {
        const filteredEmployees = this.state.employees.filter(employee => employee._id !== id[0]);
        this.setState({
          employees: filteredEmployees,
        })
      })
      .catch(err => {
        console.log(err)
      }) 
    }
  }

  startAddingEmployee = () => {
    this.setState({
      formActive: true,
      inEdition: false,
      onColumnAdding: false,
    })
  }

  handleFormSubmit = (obj) => {
    const newObj = {
      firstName: obj.firstName,
      lastName: obj.lastName,
      role: obj.role,
      businessLocation: obj.businessLocation,
      workEmail: obj.workEmail,
      workPhone: obj.workPhone,
      checked: false,
      login: obj.login,
      personalPhone: obj.personalPhone,
      personalEmail: obj.personalEmail,
      hourlyRate: obj.hourlyRate,
    }

    createEmployee(newObj)
      .then(res => {
        this.getEmpoyeesList(this.state.activePage)
      });

    this.setState({
      formActive: false,
      inEdition: false,
      onColumnAdding: false,
    })

    obj.firstName = '';
    obj.lastName = '';
    obj.login = '';
    obj.workPhone = 0;
    obj.personalPhone = 0;
    obj.workEmail = '';
    obj.personalail = '';
    obj.businessLocation = '';
    obj.company = '';
    obj.role = '';
    obj.hourlyRate = 0;
  }

  startEdittingEmployee = () => {
    this.setState({
      formActive: true,
      inEdition: true,
      onColumnAdding: false,
    })
  }

  changeCurrentEmployee = (obj) => {
    const editedEmployee = this.state.checkedEmployees[0];

    editedEmployee.firstName = obj.firstName;
    editedEmployee.lastName = obj.lastName;
    editedEmployee.role = obj.role;
    editedEmployee.businessLocation = obj.businessLocation;
    editedEmployee.workEmail = obj.workEmail;
    editedEmployee.workPhone = obj.workPhone;
    editedEmployee.hourlyRate = obj.hourlyRate;
    editedEmployee.checked = false;
    editedEmployee.login = obj.login;
    editedEmployee.personalPhone = obj.personalPhone;
    editedEmployee.personalworkMail = obj.personalworkMail;

    editEmployee(editedEmployee._id, editedEmployee)

    this.setState({
      formActive: false,
      inEdition: false,
    })

    obj.firstName = '';
    obj.lastName = '';
    obj.login = '';
    obj.workPhone = 0;
    obj.personalPhone = 0;
    obj.workEmail = '';
    obj.personalMail = '';
    obj.businessLocation = '';
    obj.company = '';
    obj.role = '';
    obj.hourlyRate = 0;
  }

  startAddingColumn = () => {
    this.setState({
      onColumnAdding: true,
      formActive: false,
      inEdition: false,
    })
  }

  handleAddColumnSubmit = (obj) => {

    if (this.state.tableHeaders.map(item => Object.values(item)[0]).includes(obj.columnName)) {
      return alert('This prop is alredy in this table!');
    }

    const newObj = {
      [obj.value]: obj.columnName
    }

    this.setState(prevstate => ({
      tableHeaders: [
        ...prevstate.tableHeaders,
        newObj
      ],
      formActive: false,
      inEdition: false,
      onColumnAdding: false,
    }))

    obj.columnName = '';
    obj.value = '';

  }

  getEmpoyeesList = (page) => {
    getEmployees(page)
      .then(res => {
        const employees = res.data.userList;
        const totalNumberOfData = res.data.fullLength
        this.setState({ employees, totalNumberOfData })
      })
      .catch(
        error => console.log(error)
      )
  }

  handleChangeActivePage = (event) => {
    this.setState({
      activePage: event.target.value,
    })

    this.getEmpoyeesList(event.target.value)
  }

  async componentDidMount() {
    this.getEmpoyeesList(this.state.activePage)
  }

  render() {
    const { employees, formActive, inEdition, checkedEmployees, tableHeaders, onColumnAdding, employeesPerPage, totalNumberOfData, activePage } = this.state;

    return (
      <div className='mainContent'>
        <table className='table'>
          <thead>
            <tr>
              {tableHeaders.map(header => (<th key={Object.values(header)}>{Object.values(header)}</th>))}
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <TableLine 
                key={employee._id}
                employee={employee}
                handleCheckboxChange={this.handleCheckboxChange}
                tableHeaders={tableHeaders}
              />
            ))}
          </tbody>
        </table>
        <div className='underTableArea'>
          <Buttons 
            employees={employees} 
            handleDeleteEmployee={this.handleDeleteEmployee}
            startAddingEmployee={this.startAddingEmployee}
            startEdittingEmployee={this.startEdittingEmployee}
            startAddingColumn={this.startAddingColumn}
            inEdition={inEdition}
          />
          <Pagination 
            totalNumberOfData={totalNumberOfData}
            employeesPerPage={employeesPerPage}
            handleChangeActivePage={this.handleChangeActivePage}
            activePage={activePage}
          />
        </div>
        <HiddenTableForm 
          formActive={formActive}
          handleFormSubmit={this.handleFormSubmit}
          inEdition={inEdition}
          checkedEmployees={checkedEmployees}
          changeCurrentEmployee={this.changeCurrentEmployee}
        />
        <HiddenAddColumnForm
          onColumnAdding={onColumnAdding}
          handleAddColumnSubmit={this.handleAddColumnSubmit}
        />
      </div>
    )
  }
}

export default App;
