import React from 'react';

class Pagination extends React.Component {

  render() {
    const { totalNumberOfData, employeesPerPage, handleChangeActivePage, activePage } = this.props;
    const totalPages = Math.ceil(totalNumberOfData / employeesPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <ul className="pageList">
        {pages.map(page => (
          <li 
            key={page} 
            value={page}
            className={`${(activePage === page) ? 'active' : ''} pageItem`}
            onClick={handleChangeActivePage}
          >
            {page}
          </li>
        ))}
      </ul>
    )
  }
}

export default Pagination;
