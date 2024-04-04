import React, { useContext } from 'react';
import userContext from '../context/UserContext';

const Rows = ({ item, editeData }) => {
  const { deletedata } = useContext(userContext);

  return (
    <tbody >
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.address}</td>
        <td><i className="fa-solid fa-trash" onClick={() => deletedata(item.id)}></i></td>
        <td><i className="fa-solid fa-pen-to-square" onClick={() => editeData(item)}></i></td>
      </tr>
    </tbody>
  );
}

export default Rows;
