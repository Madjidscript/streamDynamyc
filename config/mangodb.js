require('dotenv').config()
const mongoose= require("mongoose")
//connectDb().catch(e).console.log(e)
async function connectDb() {
    await mongoose.connect(process.env.Mango_url)
    console.log('connexion a la bd réussir avec succes')
}

module.exports = {
    connectDb
}