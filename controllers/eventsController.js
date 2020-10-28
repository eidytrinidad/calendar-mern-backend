const Evento = require('../Models/Evento')

//get all

const getEventos =async (req,res)=>{
    try {
        const eventos = await Evento.find()
                                    .populate('user',"name")
        res.status(200).json({
            ok:true,
            eventos
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"hable con su administrador"
        })
    }
}


//Crear

const crearEvento=async(req,res)=>{

    const evento = new Evento(req.body)
    
    try {
        evento.user=req.uid
        const eventoGuardado=await evento.save()      

        res.status(200).json({
            ok:true,
            evento:eventoGuardado
        })
    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}


//update
const actualizarEvento = async(req,res)=>{

    const eventoId= req.params.id
    const uid=req.uid

    console.log(eventoId)
    try {

        const evento = await Evento.findById(eventoId)

        if (!evento) {
            res.status(400).json({
                ok:false,
                msg:"Evento no Existe"
                
            })
        } 
        
        if (evento.user.toString()!==uid) {
            return res.status(401).json({
                ok:false,
                msg:"No tiene privilegio de editar este evento"
            })
        }
        const nuevoEvento={
            ...req.body,
            user:uid
        }

        const eventoActualizado= await Evento.findOneAndUpdate({_id:eventoId},nuevoEvento,{new:true})
        res.status(200).json({
            ok:true,
            eventoActualizado
        })
        
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}

//delete
const eliminarEvento =async(req,res)=>{
  
    const eventoId=req.params.id
    const uid= req.uid

    try {
        
        const evento =  await Evento.findById(eventoId)

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:"El Evento no Existe"
            })
        }

        if (evento.user.toString()!==uid) {
            return res.status(401).json({
                ok:false,
                msg:"No tiene privilegios para borrar este evento"
            })
        }

        await Evento.findOneAndDelete(eventoId)

        res.status(200).json({
            ok:true,
            msg:"Evento Borrado"
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}

module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}