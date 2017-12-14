const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

// admin.initializeApp(functions.config().firebase);

function indexRecord(index, type, id, record) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;

  return fetch(`${elasticUrl}/${index}/${type}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(record),
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json());
  // .then(response => console.log(response))
  // .catch(error => console.log(error));
}

function deleteRecord(index, type, id) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;

  return fetch(`${elasticUrl}/${index}/${type}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json());
  // .then(response => console.log(response))
  // .catch(error => console.log(error));
}

function indexProcess(type, id, record, parentId) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;
  const parentClause = parentId ? `?parent=${parentId}` : '';

  return fetch(`${elasticUrl}/process/${type}/${id}${parentClause}`, {
    method: 'PUT',
    body: JSON.stringify(record),
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function deleteProcess(type, id) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;

  return fetch(`${elasticUrl}/process/${type}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function getCurrentStage(process) {
  if(process.Placement) {
    return 'Placement';
  } else if (process.Offer) {
    return 'Offer';
  } else if (process.CCM) {
    return 'CCM';
  } else if (process.Submittal) {
    return 'Submittal';
  } else if (process.Application) {
    return 'Application';
  }
}

module.exports = {
  indexRecord,
  deleteRecord,
  indexProcess,
  deleteProcess,
  getCurrentStage
};
