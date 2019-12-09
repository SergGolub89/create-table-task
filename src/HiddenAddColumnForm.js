import React from 'react';

class HiddenAddColumnForm extends React.Component {
  state = {
    columnName: '',
    value: '',
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    const { onColumnAdding, handleAddColumnSubmit } = this.props;

    return (
      <form
        className={(onColumnAdding) ? 'activeTable' : 'disabledTable'}
      >
        <h3>Add Column</h3>
        <div className='block'>
          <div className='field'>
            <label htmlFor='columnName'>
              Column Name:
            </label>
            <input
              id='columnName' 
              type='text'
              name='columnName'
              value={this.state.columnName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='field'> 
            <label htmlFor='value'>
              Value:
            </label>
            <input 
              id='value' 
              type='text'
              name='value'
              value={this.state.value}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <button
          type='button'
          className='submitButton'
          onClick={() => handleAddColumnSubmit(this.state)}
        >
          SUBMIT
        </button>
      </form>
    )
  }
}

export default HiddenAddColumnForm;
