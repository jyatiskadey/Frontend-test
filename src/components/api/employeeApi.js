const BASE_URL = 'https://ppm-api.cludocloud.com/Auth';

export const fetchInitialData = async () =>
  await fetch(`${BASE_URL}/PageLoadForEmployeeDemoProfile`).then(res => res.json());

export const fetchEmployees = async () =>
  await fetch(`${BASE_URL}/SelectEmployeeDemoProfile`).then(res => res.json());

export const saveEmployee = async (data) =>
  await fetch(`${BASE_URL}/InsertUpdateEmployeeDemoProfile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getEmployeeById = async (id) =>
  await fetch(`${BASE_URL}/EditEmployeeDemoProfile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  }).then(res => res.json());

export const deleteEmployee = async (id) =>
  await fetch(`${BASE_URL}/DeleteEmployeeDemoProfile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  }).then(res => res.json());
