require('dotenv').config({path: '../.env'});
const fs = require('fs');
const fetch = require('node-fetch');
const headers = {
  'Authorization': 'Basic dnI5ZHZvaGlmbDp0dXZua2w5dTQ4',
  'Content-Type': 'application/json'
};

fs.readdirSync('./mappings')
  .filter(filename => /.json$/i.test(filename))
  .forEach(filename => {
    const index = filename.split('.')[0];
    
    
    
    depolyMapping(index)
      .then(() => console.log('DONE ' + index));
  });


// 


async function depolyMapping(index) {
  console.log(`Start deploying ${index}`);
  
  const indexExist = await retrieveIndex(index);
  
  if (indexExist) {
    console.log('REMOVE MAPPINGS ' + index);
    await removeIndex(index);
  }
  
  console.log('DEPLOY MAPPINGS' + index);
  await deployMappings(index);
}
  
async function retrieveIndex(index) {
  const response = await fetch(`${process.env.ELASTIC_URL}/${index}`, { method: 'HEAD', headers });
  
  return response.status == 200 ? true : false;
}


async function removeIndex(index) {
  const response = await fetch(`${process.env.ELASTIC_URL}/${index}`, { method: 'DELETE', headers });
  
  console.log(response.status);
}

async function deployMappings(index) {
  const jsonBody = require(`./mappings/${index}.json`);
  const response = await fetch(`${process.env.ELASTIC_URL}/${index}`, { 
    method: 'PUT', 
    headers,
    body: JSON.stringify(jsonBody)
  });
  
  console.log(response.status);
}

// curl -XDELETE --header "Authorization: Basic dnI5ZHZvaGlmbDp0dXZua2w5dTQ4" 'https://first-cluster-8947855740.us-west-2.bonsaisearch.net/company?pretty'

// curl -XPUT --header "Authorization: Basic dnI5ZHZvaGlmbDp0dXZua2w5dTQ4" 'https://first-cluster-8947855740.us-west-2.bonsaisearch.net/company?pretty' -H 'Content-Type: application/json' -d '{"mappings": {"Company": {"properties": {"Name": { "type":  "text" },"Type": { "type":  "keyword" },"Source": { "type":  "keyword" },"RegistrationDate": {"type":   "date","format": "yyyy-MM-dd"},"Recruiter": {"properties": {"id": { "type":  "keyword" },"Name": { "type":  "text" }}},"Industry": {"properties": {"Category": { "type":  "keyword" },"Code": { "type":  "keyword" }}},"Phones": { "type":  "keyword" },"Emails": { "type":  "keyword" },"Addresses": {"properties": {"Street": { "type":  "keyword" },"Complement": { "type":  "keyword" },"City": { "type":  "keyword" },"State": { "type":  "keyword" },"Country": { "type":  "keyword" }}},"Profile": { "type": "text" }}}}}'

