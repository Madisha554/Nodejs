const express = require('express');
const router = express.Router()
const clientController = require('../../controller/clientController')

router.route('/')
   .get(clientController.getAllClient)
    .post(clientController.postNewClient)
    .put(clientController.putClient)
    .delete(clientController.deleteClient);

router.route('/:id')
      .get(clientController.getClient)

module.exports = router;