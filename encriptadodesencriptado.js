/* proceso de enciptacion*/

const crypto = require('crypto')


//para consultar metodos de encriptacion  console.log(crypto.getCiphers())
//3 partes del proceso-metodo de generar encriptacion
const algoritmo = 'aes-256-cbc'//forma de enciptacion
const key = crypto.randomBytes(32) //valor unico
const iv = crypto.randomBytes(16) // vector complejidad codigo encriptado

const encriptar = (password) => {
    const cipher = crypto.createCipheriv(algoritmo, Buffer.from(key), iv)  /*en cipher se crea vector
     de inicializacion createcipheriv y se le pasa los tres parametros
    guardamos los     vamos a usar de forma encriptada*/
    let encriptacion = cipher.update(password)/*con update se actualiza el cifrado entre lo que yo quiero 
    cifrar por password con la contrasena cifrado generada mediante cipher, por  cipher update nos encripta
     la password pasada como parametro,se guarda en un let dado que  lo vamos a modificar,*/
    encriptacion = Buffer.concat([encriptacion, cipher.final()])/* de esta concatenacion sale el codigo enciptado en 
    objeto con dos parametros(lo encriptado(formade ecriptar) y lo que me devuelve 
    la enciptacion(lo que serian ultimos ultimos cambios)  */
    return {
        iv: iv.toString('hex'), passwordEncriptado: encriptacion.toString('hex')/* (vector de inicializacion y la contrasena  )  para pasar un buffer a un string
         , en formato hexadecimal*/
    }

}
 const hackerman=(password)=>{
     let iv=Buffer.from(password.iv,'hex')

     let valor=Buffer.from(password.passwordEncriptado,'hex')

     let decipher = crypto.createDecipheriv(algoritmo,Buffer.from(key),iv)

     let desencriptar=decipher.update(valor)
     desencriptar=Buffer.concat([desencriptar,decipher.final()])
     
     return desencriptar.toString()
 }


const password = "Hola"
let passwordEncriptado=encriptar(password)
console.log(encriptar(password))
console.log(hackerman(passwordEncriptado) )
