import React from 'react';

class TableLine extends React.Component {

  render() {
    const { employee, handleCheckboxChange, tableHeaders } = this.props;
    const preparedTableHeaders = tableHeaders.map(item => Object.keys(item)[0]);

    return (
      <tr>
        {preparedTableHeaders.map((prop, i) => {
          switch(typeof employee[prop]) {
            case 'string': return (<td key={10000 + i}>{employee[prop]}</td>);
            case 'number': return (<td key={10000 + i}>{employee[prop]}</td>);
            case 'boolean': return (
              <td key={10000 + i}>
                <input 
                  type='checkbox'
                  checked={employee[prop]}
                  onChange={() => handleCheckboxChange(employee._id)}
                />
              </td>
            )
            default: return <td></td>;
          }
        })}
      </tr>
    )
  }
}

export default TableLine;
