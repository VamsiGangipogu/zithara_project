import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, [search, sortBy, currentPage]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customer_details', {
        params: {
          search,
          sortBy,
          page: currentPage,
        },
      });
      setCustomers(response.data);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / 20)); // Assuming 20 records per page
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>Customer List</h2>
      <div>
        <label>Search: </label>
        <input type="text" value={search} onChange={handleSearchChange} />
      </div>
      <div>
        <label>Sort By: </label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">-- Select --</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{customer.date}</td>
              <td>{customer.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Page {currentPage} of {totalPages}</p>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
