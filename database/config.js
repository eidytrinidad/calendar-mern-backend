const mongoose = require('mongoose')

const dbConnection=async()=>{

    try {
      await  mongoose.connect(process.env.DB_CNN,{
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        console.log('Base de Datos connectada')
    } catch (error) {
        console.log(error)
        throw new Error("Error al cargar base de datos")
    }

}

module.exports={
    dbConnection
}