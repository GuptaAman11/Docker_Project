
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const url = `mongodb+srv://${username}:${password}@cluster0.qtraj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// const url = 'mongodb://127.0.0.1/practice'
const Connection = () => {
    mongoose.connect(url).then(() => {
        console.log("concttioned!!!")
    })
}
 
module.exports = {
    Connection
}