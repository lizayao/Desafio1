const express = require('express')
const ProductManager = require('/ProductManager')
const product = new ProductManager()
const app = express()

const template = `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home</title>
    </head>
    <body>
      <h1 style="color: red;">Bienvenidos a mi pagina!</h1>
    </body>
  </html>
  `

app.get('/', (req, res) => {
  return res.send(template)
})

app.get('/products', (req, res) => {
  return res.send('Bienvenido a la página de contacto')
})

app.get('/users', async (req, res) => {
  const products = manager.getProducts(req.query.limit)


  /*     if (!gender) {
        return res.send(users)
      }
    
      const usersFiltered = users.filter(user => user.gender === gender)
    
      return res.send(usersFiltered) */
})

app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)

  const includeId = req.query.includeId === 'true'

  console.log(includeId, typeof includeId)

  const user = users.find(user => user.id === userId)

  if (!user) {
    return res.send({})
  }

  const userCopy = { ...user }

  if (!includeId) {
    delete userCopy.id
  }

  return res.send(userCopy)
})

app.listen(8080, () => {
  console.log('Servidor express puerto 8080')
})