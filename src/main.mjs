import { getParameterByName } from './utils/getId.mjs'
import { usersPosts } from './utils/getPost.mjs'

// Optiene el id de la url
const prodId = getParameterByName('id');
console.log('el id es: ', prodId)
console.log('los posts son: ', usersPosts)

// Determina cual es el post
const myPost = usersPosts.filter((item) => item.id == prodId)[0]

console.log(myPost)

// Modifica el Open Graph y Twitter Card
// Imagen
const ogImage = document.querySelectorAll("#ogImage")
const twImage = document.querySelectorAll("#twImage")
ogImage[0].content = myPost.urlImage
twImage[0].content = myPost.urlImage
// Descripción
const ogDescription = document.querySelectorAll("#ogDescription")
const twDescription = document.querySelectorAll("#twDescription")
ogDescription[0].content = myPost.description
twDescription[0].content = myPost.description
