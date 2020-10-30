const Usuario = require("../Models/Usuario");
const bcrypt = require("bcryptjs")
const {generarJWT} = require('../helpers/jwt')

const createUser = async (req, res) => {

  const {
    email,
    password
  } = req.body;

  try {

    let usuario = await Usuario.findOne({
      email
    })

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo",

      });
    }

    usuario = new Usuario(req.body)

    //encryptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    //Generar JWT
    const token=await generarJWT(usuario.id,usuario.name)

    return res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el administrador",

    });
  }

};

//login
const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {

      const usuario = await Usuario.findOne({email})

      if (!usuario) {
        return res.status(400).json({
          ok: false,
          msg: "Usuario incorrecto",

        });
      }

      //confirmar password
      const validPassword = bcrypt.compareSync(password, usuario.password)

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Password incorrecto",

        });
      }

      //Generar JWT
      const token=await generarJWT(usuario.id,usuario.name)

       return res.json({
         ok: true,
         uid: usuario.id,
         name: usuario.name,
         token 
       })

    } 
    catch (error) {

          console.log(error)
         return  res.status(500).json({
            ok: false,
            msg: "Porfavor hable con el administrador",
          
          });
      };
  }

    // renew
    const revalidarToken = async(req, res) => {
      const uid = req.uid
      const name=req.name

      //generar un nuevo jwt y retornarlo

      const token = await generarJWT(uid,name)

      return res.status(201).json({
        ok: true,
        uid,
        name,
        token
      });
    };

    module.exports = {
      createUser,
      loginUser,
      revalidarToken,
    }
  