const data = {
  client: require('../model/client.json'),
  setClient: function (data) {this.client = data}
}

const getAllClient = (req, res)=>{
  res.json(data.client)
}
const postNewClient =(req, res) => {
  const newClient = { 
    id: data.client.length ? data.client[data.client.length - 1].id + 1 : 1, 
    name: req.body.name, 
    dept: req.body.dept
  }
  if(!newClient.name || !newClient.dept){
    return res.status(400).json({'message': "Missing required fields"})
  }
  data.setClient([...data.client, newClient])
  res.json(data.client)
}
const putClient= (req, res) => {
  const cli = data.client.find(c => c.id === parseInt(req.body.id));
  if(!cli){
    return res.status(404).json({'message': `Client ID ${req.body.id} not found`})
  }
  if(req.body.name) cli.name = req.body.name
  if(req.body.dept) cli.dept = req.body.dept

  const filterArray = data.client.filter(cli => cli.id !== parseInt(req.body.id))
  const unsortedArray = ([...filterArray, cli])
  data.setClient(unsortedArray.sort((a, b) => a.id > b.id? 1: a.id < b.id? -1:0))
  res.json(data.client)
}
const deleteClient = (req, res) => {
  const cli = data.client.find(c => c.id === parseInt(req.body.id));
  if(!cli){
    return res.status(404).json({'message': `Client ID ${req.body.id} not found`})
  }
  const filterArray = data.client.filter(cli => cli.id!== parseInt(req.body.id))
  data.setClient([...filterArray])
  res.json(data.client)
  
};

  const getClient = (req, res) =>{
    const cli = data.client.find(c => c.id === parseInt(req.params.id));
    if(!cli){
      return res.status(404).json({'message': `Client ID ${req.params.id} not found`})
    }
    res.json(cli)
    // res.json({"id": req.params.id})
  }

  module.exports = {
    getAllClient,
    postNewClient,
    putClient,
    deleteClient,
    getClient
  }
