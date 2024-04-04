const sq=require('mysql')

const connection=sq.createConnection({
    host:"localhost",
    user:"root",
    password:"sonu12",
    database:"company2"
    
})

connection.connect(function(err){
    if(err){
        console.error("this is error", err)
    }
    console.log("db is connected")
})

module.exports=connection