import React, { useState } from 'react'
import userContext from './UserContext'

const UserState = ({ children }) => {

    const [add, setAdd] = useState([])

    
    

    const host = "http://localhost:9000"


       //this route to fetch data
        const fetchdata = async () => {
            const response = await fetch(`${host}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                }
            })
            const json = await response.json()
            let newdata = json.data.map((item) => ({
                id: item.id,
                firstName: item.firstName,
                lastName: item.lastName,
                address: item.address
            }
            ))
            setAdd(newdata)
        }
        
    





// this route add data
    const addData = async (firstName, lastName, address) => {
        const response = await fetch(`${host}/add`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ firstName, lastName, address })
        })
        const json = await response.json()
        setAdd(add.concat(json)) 
        fetchdata()
    }

    
    // this delete route
    const deletedata=async(id)=>{
        const response=await fetch(`${host}/delete/${id}`,{
            method:"GET",
            headers:{
                "Content-type":'application/json'
            }
        })
        const json=await response.json()
        const deleteuser=add.filter((item)=>item.id !==id)
        setAdd(deleteuser)
    }

    const updatedata=async(id, firstName, lastName, address)=>{
       
        const response=await fetch(`${host}/update/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type":'application/json'
            },
            body:JSON.stringify({firstName, lastName, address})

        })
        const json=await response.json()

        let newData=JSON.parse(JSON.stringify(add))

        for(let index=0; index<newData.length; index++){
            const element=newData[index]
            if(element.id===id){
                newData[index].firstName=firstName
                newData[index].lastName=lastName
                newData[index].address=address
                break
            }

        }

        setAdd(newData)

    }













    return (
        <userContext.Provider value={{ add, setAdd, addData, fetchdata, deletedata, updatedata}}>
            {children}
        </userContext.Provider>


    )
}

export default UserState