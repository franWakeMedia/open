const express = require('express')
const path = require('path')
const fs = require("fs")
const { getPostById } = require('./stub/posts')
const app = express()

const PORT = process.env.PORT || 3000
const indexPath  = path.resolve(__dirname, '..', 'index.html')

app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
))

app.get('/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) { 
            console.error('Error al renderizar', err)
            return res.status(404).end()
        }
        // trae la información
        const postId = req.query.id;
        const post = getPostById(postId)
        if(!post) return res.status(404).send("Post not found")

        // agregar meta tags
        htmlData = htmlData.replace(
            "<title>Somos el Cambio</title>",
            `<title>${post.title}</title>`
        )
        .replace('__META_OG_TITLE__', 'Somos el Cambio | ' + post.tag)
        .replace('__META_OG_DESCRIPTION__', post.description)
        .replace('__META_DESCRIPTION__', post.description)
        .replace('__META_OG_IMAGE__', post.urlImage)
        return res.send(htmlData);
    });
});
// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error ', error)
    }
    console.log("listening on " + PORT + "...")
});