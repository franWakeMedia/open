const fetch = require ('node-fetch') 

const getData = async (id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const apiURL = "https://api.somoselcambio.net/api/node/post"
  try{
    const response = await fetch(apiURL, requestOptions)
    const data = await response.json()
      const rtaId = data.data.filter((item) => item.id == id)[0]
	  console.log(data.data)
      return rtaId
  }catch (error){
      console.log("Fetch Error: ", error);
  }
}

const getImage = async (idImage) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const apiURL = `https://api.somoselcambio.net/api/media/image/${idImage}/field_image`
  try{
    const response = await fetch(apiURL, requestOptions)
    const data = await response.json()
    return data.data.attributes.uri.url
  }catch (error){
      console.log("Fetch Error: ", error);
  }
}

const getPostById = async (id) => {
  const postInfo = await getData(id)
  const idImagePost = postInfo["relationships"]["media_image"]["data"]["id"]
  const imagePost = await getImage(idImagePost)

  return {
    description: postInfo.attributes.body.value,
    urlImage: imagePost
  }
}
        

module.exports.getPostById = (postId) => getPostById(postId)
