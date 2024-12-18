const Client = require('../model/Client');


const getAllClient = async (req, res)=>{
  const clients = await Client.find();
  if(!clients) return res.status(404).json({'message': 'No clients found'})
  res.json(clients)
}

const postNewClient = async (req, res) => {
  if(!req?.body?.name || !req?.body?.dept){
    return res.status(404).json({'message': 'Both name and dept are required'})
  }
  try{
    const result = await Client.create({
      name: req.body.name,
      dept: req.body.dept
    })
    res.status(201).json(result)
  }catch(err){
    console.error(err);
    res.status(500).json({'message': 'Server Error'})
  }
}
const updateClient= async (req, res) => {
  if(!req?.body?.id){
    return res.status(400).json({'message': 'ID paramete r is required'})
  }
  const client = await Client.findOne({_id: req.body.id}).exec();
  if(!client) {
    return res.status(204).json({'message': `No client matches ID ${req.body.id}`})
  }
// may be you have to ignore the ? after req
  if(req?.body?.name) client.name = req.body.name;
  if(req?.body?.dept) client.dept = req.body.dept;

  const result = await client.save();
  res.json(result)
}
const deleteClient = async (req, res) => {
  if(!req?.body?.id){
    return res.status(400).json({'message': 'ID parametexxxr is required'})
  }
  const client = await Client.findOne({_id: req.body.id}).exec();
  if(!client){
    return res.status(204).json({'message': `No client matches ID ${req.body.id}.`})
  }
  const result = await client.remove();
  res.json(result)
};

  const getClient = async (req, res) =>{
    if(!req?.params?.id) return res.status(404).json({'message': 'ID parameter is required'}) ;
    const client = await Client.findOne({_id:req.params.id}).exec();
    if(!client) return res.status(204).json({'message': `No client found with ID ${req.params.id}`});

    res.json(client)
    // res.json({"id": req.params.id})
  }

  module.exports = {
    getAllClient,
    postNewClient,
    updateClient,
    deleteClient,
    getClient
  }
