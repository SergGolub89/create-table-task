import React from 'react';

class HiddenTableForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    login: '',
    workPhone: 0, 
    personalPhone: 0,
    workEmail: '',
    personalEmail: '',
    businessLocation: '',
    company: '',
    role: '',
    hourlyRate: 0,
    isActive: false
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.inEdition) {
      this.setState({
        firstName: this.props.checkedEmployees[0].firstName || '',
        lastName: this.props.checkedEmployees[0].lastName || '',
        login: this.props.checkedEmployees[0].login || '',
        workPhone: this.props.checkedEmployees[0].workPhone || 0,
        personalPhone: this.props.checkedEmployees[0].personalPhone || 0,
        workEmail: this.props.checkedEmployees[0].workEmail || '',
        personalEmail: this.props.checkedEmployees[0].personalEmail || '',
        businessLocation: this.props.checkedEmployees[0].businessLocation || '',
        company: this.props.checkedEmployees[0].company || '',
        role: this.props.checkedEmployees[0].role || '',
        hourlyRate: this.props.checkedEmployees[0].hourlyRate || 0,
      })
    }
  }

  render() {
    const { formActive, handleFormSubmit, changeCurrentEmployee, inEdition } = this.props;

    return (
      <form
        className={(formActive) ? 'activeTable' : 'disabledTable'}
      >
        <b>Add Employee</b>
        <br />
        <div className='block'>
          <p>PERSONAL</p>
          <hr />
          <div className='field'>
            <label htmlFor='firstName'>
              First Name:
            </label>
            <input 
              id='firstName' 
              type='text'
              name='firstName'
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='field'>
            <label htmlFor='lastName'>
              Last Name:
            </label>
            <input 
              id='lastName' 
              type='text'
              name='lastName'
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='field'>
            <label htmlFor='login'>
              Login:
            </label>
            <input 
              id='login' 
              type='text'
              name='login'
              value={this.state.login}
              onChange={this.handleInputChange}
            />
          </div>
        <p>CONTACT</p>
        <hr />
          <div className='field'>
            <label htmlFor='workPhone'>
              Work Phone:
            </label>
            <input 
              id='workPhone' 
              type='tel'
              name='workPhone'
              value={this.state.workPhone}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='field'>
            <label htmlFor='personalPhone'>
              Personal Phone:
            </label>
            <input 
              id='personalPhone' 
              type='tel'
              name='personalPhone'
              value={this.state.personalPhone}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='field'>
            <label htmlFor='email'>
              Work Email:
            </label>
            <input 
              id='email' 
              type='email'
              name='workEmail'
              value={this.state.workEmail}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='field'>
            <label htmlFor='personalEmail'>
              Personal Email:
            </label>
            <input 
              id='personalEmail' 
              type='email'
              name='personalEmail'
              value={this.state.personalEmail}
              onChange={this.handleInputChange}
            />
          </div>
        <p>EMPLOYMENT</p>
        <hr />
          <div className='field'>
            <label htmlFor='businessLocation'>
              Business Location:
            </label>
            <select 
              id='businessLocation' 
              name='businessLocation'
              value={this.state.businessLocation}
              onChange={this.handleInputChange}
            >
              <option value='' hidden>Choose the location</option>
              <option value='Kyiv'>Kyiv</option>
              <option value='San Francisco'>San Francisco</option>
              <option value='New York'>New York</option>
            </select>
          </div>
          <div className='field'>
          <label htmlFor='company'>
            Company:
          </label>
            <select 
              id='company' 
              name='company'
              value={this.state.company}
              onChange={this.handleInputChange}
            >
              <option value='' hidden>Choose the company</option>
              <option value='Moving LLC'>Moving LLC</option>
              <option value='WTT Solutions'>WTT Solutions</option>
              <option value='Kyivstar'>Kyivstar</option>
              <option value='Apple'>Apple</option>
            </select>
          </div>
          <div className='field'>
            <label htmlFor='role'>
              Role:
            </label>
            <select 
              id='role' 
              name='role'
              value={this.state.role}
              onChange={this.handleInputChange}
            >
              <option value='' hidden>Choose the role</option>
              <option value='Helper'>Helper</option>
              <option value='Developer'>Developer</option>
              <option value='Project Manager'>Project Manager</option>
              <option value='Tester'>Tester</option>
            </select>
          </div>
          <div className='field'>
            <label htmlFor='hourlyRate'>
              Hourly Rate:
            </label>
            <input 
              id='hourlyRate' 
              type='number'
              name='hourlyRate'
              className='shortInput'
              value={this.state.hourlyRate}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <button
          type='button'
          className='submitButton'
          onClick={(inEdition) ? () => changeCurrentEmployee(this.state) : () => handleFormSubmit(this.state)}
        >
          Add Employee
        </button>
      </form>
    )
  }
}

export default HiddenTableForm;
