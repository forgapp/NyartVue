const functions = require('firebase-functions');
const { indexRecord, deleteRecord } = require('./lib/elastic');
const { transformPhones, transformEmails, removeRef } = require('./lib/transform');

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

    return indexRecord('contacts', 'doc', id, recordToIndex);
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

    return indexRecord('contacts', 'doc', id, recordToIndex);
  });

const onCandidateDeletedIndex = functions.firestore
  .document('Candidate/{candidateId}')
  .onDelete(event => {
    const id = event.params.companyId;

    return deleteRecord('contacts', 'doc', id);
  });

module.exports = {
  onCandidateCreatedIndex,
  onCandidateUpdatedIndex,
  onCandidateDeletedIndex
};
