import { getParameterByName } from './utils/getId.mjs'
import { usersPosts } from './utils/getPost.mjs'


const prodId = getParameterByName('id');
console.log('el id es: ', prodId)
console.log('los posts son: ', usersPosts)

const myPost = usersPosts.filter((item) => item.id == prodId)

console.log(myPost)