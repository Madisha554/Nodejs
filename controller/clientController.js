const data = {}
data.client = require('../model/client.json');
const getAllClient = (req, res)=>{
  res.json(data.client)
}
const postNewClient =(req, res) => {
  res.json({
    "name": req.body.name,
    "dept": req.body.dept
  });
}
const putClient= (req, res) => {
  res.json({
    "name": req.body.name,
    "dept": req.body.dept
  });
}
const deleteClient = (req, res) => {
  res.json({ "id": req.body.id });
};

  const getClient = (req, res) =>{
    res.json({"id": req.params.id})
  }

  module.exports = {
    getAllClient,
    postNewClient,
    putClient,
    deleteClient,
    getClient
  }
