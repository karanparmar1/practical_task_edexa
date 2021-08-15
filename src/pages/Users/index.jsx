import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputBox from '../../components/input_box';
import { GetAge, GetUsers, SetUsersList, StrCompare } from '../../utils/helper';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();
  const [sorter, setSorter] = useState([() => {}, true]); //sorter[0] will be sort callback and sorter[1] will be asc desc order

  useEffect(() => {
    setUsers(GetUsers());
  }, []);

  const handleDelete = (id) => (e) => {
    const updated = users.filter((u) => u.id !== id);
    SetUsersList(updated);
    setUsers([...updated]);
  };

  const sortByName = () =>
    setSorter([(a, b) => (sorter[1] ? StrCompare(a.name, b.name) : StrCompare(b.name, a.name)), !sorter[1]]);

  const sortByAge = () => {
    setSorter([
      (a, b) => (sorter[1] ? new Date(a.bday) - new Date(b.bday) : new Date(b.bday) - new Date(a.bday)),
      !sorter[1],
    ]);
  };

  const sortByEmail = () =>
    setSorter([(a, b) => (sorter[1] ? StrCompare(a.email, b.email) : StrCompare(b.email, a.email)), !sorter[1]]);

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <div className="users-wrapper">
      <h1>Users</h1>
      <div className="table-header">
        <InputBox value={search} onChange={handleSearch} placeholder="Enter Name to search" />
      </div>
      <div className="user-table-wrapper">
        <table className="table-users">
          <thead>
            <tr>
              <th role="button" onClick={sortByName}>
                Name
              </th>
              <th role="button" onClick={sortByEmail}>
                Email
              </th>
              <th role="button" onClick={sortByAge}>
                Age
              </th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length ? (
              users
                .sort(sorter[0])
                .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
                .map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{GetAge(u.bday)}</td>
                    <td>{u.address}</td>
                    <td>
                      <button className="btn-edit" onClick={() => history.push('/edit/' + u.id)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={handleDelete(u.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr className="no-data-table">
                <td>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
