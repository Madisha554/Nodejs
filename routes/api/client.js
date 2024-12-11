const express = require('express');
const router = express.Router()
const data = {}
data.client = require('../../data/client.json')
router.route('/')
   .get((req, res) => {
        res.json(dataclient)
    })
    .post((req, res) => {
      res.json({
        "name": req.body.name,
        "dept": req.body.dept
      });
    })
    .put((req, res) => {
      res.json({
        "name": req.body.name,
        "dept": req.body.dept
      });
    })
    .delete((req, res) => {
      res.json({ "id": req.body.id });
    });

router.route('/:id')
      .get((req, res) =>{
        res.json({"id": req.params.id})
      })


module.exports = router;