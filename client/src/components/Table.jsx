import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../context/UserContext'
import AddData from './AddData'
import Rows from './Rows'
import { useNavigate } from 'react-router-dom'
const Table = () => {

  const navigate=useNavigate()

  const { add, fetchdata, updatedata } = useContext(userContext)

  const [rename, setRename]=useState({id:"", efirstName:"", elastName:"", eaddress:""})




  useEffect(() => {
    if(localStorage.getItem("token")){
      fetchdata()
    }
    else{
      navigate('/login')

    }
    

  }, [])


  const ref = useRef(null)
  const refClose = useRef(null)



  const editeData = (currentdata) => {
    ref.current.click()
    setRename({id:currentdata.id, efirstName:currentdata.firstName, elastName:currentdata.lastName, eaddress:currentdata.address})
    
  }


  const HandleClick=()=>{
  updatedata(rename.id, rename.efirstName, rename.elastName, rename.eaddress)
  refClose.current.click()
    

  }

  const onchange=(e)=>{
    setRename({...rename,[e.target.name]:e.target.value})
    
  }


  return (
    <>

      <AddData />
      <hr />


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Entery</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form className="my-3" >
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">firstName</label>
                  <input type="text" className="form-control" id="efirstName" name="efirstName" aria-describedby="emailHelp" value={rename.efirstName}  onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">lastName</label>
                  <input type="text" className="form-control" id="elastName" name="elastName"  value={rename.elastName} onChange={onchange}  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">address</label>
                  <input type="text" className="form-control" id="eaddress" name="eaddress" value={rename.eaddress} onChange={onchange}  />
                </div>

              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={HandleClick} >Update</button>
            </div>
          </div>
        </div>
      </div>

      <table className="table mt-4 " >
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">First Name</th>
            <th scope="col">LastName</th>
            <th scope="col">Address</th>
            <th scope='col'>Delete</th>
            <th scope='col'>Edit</th>
          </tr>
        </thead>
        {add.map((item) => {
          return <Rows item={item} key={item.id} editeData={editeData} />

        }
        )}
      </table>


    </>
  )
}

export default Table