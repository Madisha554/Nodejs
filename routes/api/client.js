const express = require('express');
const router = express.Router()
const clientController = require('../../controller/clientController')
const Roles_List = require('../../config/roleList')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
      //View all clients who in the Database
   .get(clientController.getAllClient)
      //Post client into the server
    .post(verifyRoles(Roles_List.Admin, Roles_List.Editor), clientController.postNewClient)
      //Update client on server
    .put(verifyRoles(Roles_List.Admin, Roles_List.Editor),clientController.updateClient)
       //Delete
    .delete(verifyRoles(Roles_List.Admin),clientController.deleteClient);
      // Get Client by Id
router.route('/:id')
      .get(clientController.getClient)

module.exports = router;