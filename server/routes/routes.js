const routes = (router) => {
  router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to SMS app'})
  })
}

export default routes;