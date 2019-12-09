import React from 'react';

class Buttons extends React.Component {
  render() {
    const { employees, handleDeleteEmployee, startAddingEmployee, startEdittingEmployee, inEdition, startAddingColumn } = this.props;

    return (
      <div className='buttons'>
        <button
          type='button'
          className='addEmployeeButton'
          onClick={startAddingEmployee}
        >
          ADD EMPLOYEE
        </button>
        <button
          type='button'
          className='editEmployeeButton'
          disabled={employees.filter(employee => employee.checked === true).length !== 1}
          onClick={startEdittingEmployee}
        >
          EDIT
        </button>
        <button
          type='button'
          className='deleteEmployeeButton'
          disabled={inEdition}
          onClick={handleDeleteEmployee}
        >
          DELETE
        </button>
        <button
          type='button'
          className='addColumnButton'
          disabled={inEdition}
          onClick={startAddingColumn}
        >
          ADD COLUMN
        </button>
      </div>
    )
  }
}

export default Buttons;
