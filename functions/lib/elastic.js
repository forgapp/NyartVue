const functions = require('firebase-functions');
const fetch = require('node-fetch');

function indexRecord(index, type, id, record) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;

  return fetch(`${elasticUrl}/${index}/${type}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(record),
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json());
}

function deleteRecord(index, type, id) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;

  return fetch(`${elasticUrl}/${index}/${type}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json());
}

module.exports = {
  indexRecord,
  deleteRecord
};
