import React from 'react';
import EmployeeForm from './components/Pages/Employee';
import EmployeeList from './components/Pages/EmployeeList';

function App() {
  return (
    <div className="container">
      <h2>Employee Master</h2>
      <EmployeeForm />
      <hr />
      <h2>Employee Register</h2>
      <EmployeeList />
    </div>
  );
}

export default App;
