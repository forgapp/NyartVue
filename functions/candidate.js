const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const utils = require('./utils');

function transformPhones(phones) {
  if (!phones) {
    return [];
  }
  
  return phones.map(phone => phone.Number);
}

function transformEmails(emails) {
  if (!emails) {
    return [];
  }
  
  return emails.map(email => email.Address);
}

function removeRef(info) {
  return Object.keys(info)
    .filter(key => key.toLowerCase() !== 'ref')
    .reduce((aggr, current) => {
      return Object.assign({}, aggr, { [current]: info[current] });
    }, {});
}

const onCandidateCreatedIndex = functions.firestore
  .document('Candidate/{candidateId}')
  .onCreate(event => {
    const original = event.data.data();
    const id = event.params.candidateId;
    const recordToIndex = Object.assign({}, original, {
      Phones: transformPhones(original.Phones),
      Emails: transformEmails(original.Emails),
      Company: removeRef(original.Company),
      Type: 'candidate'
    });
    
    return utils.indexRecord('contacts', 'doc', id, recordToIndex);
  });

const onCandidateUpdatedIndex = functions.firestore
  .document('Candidate/{candidateId}')
  .onUpdate(event => {
    const original = event.data.data();
    const id = event.params.candidateId;
    const recordToIndex = Object.assign({}, original, {
      Phones: transformPhones(original.Phones),
      Emails: transformEmails(original.Emails),
      Company: removeRef(original.Company),
      Type: 'candidate'
    });
    
    return utils.indexRecord('contacts', 'doc', id, recordToIndex);
  });
  
const onCandidateDeletedIndex = functions.firestore
  .document('Candidate/{candidateId}')
  .onDelete(event => {
    const id = event.params.companyId;
    
    return utils.deleteIndex('contacts', 'doc', id);
  });

module.exports = {
  onCandidateCreatedIndex,
  onCandidateUpdatedIndex,
  onCandidateDeletedIndex
};
