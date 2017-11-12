const functions = require('firebase-functions');
const admin = require('firebase-admin');
const utils = require('./utils');

// admin.initializeApp(functions.config().firebase);

const onCompanyCreatedIndex = functions.firestore
  .document('Company/{companyId}')
  .onCreate(event => {
    const original = event.data.data();
    const id = event.params.companyId;
    
    utils.indexRecord('Company', id, original);
  });

const onCompanyupdatedIndex = functions.firestore
  .document('Company/{companyId}')
  .onUpdate(event => {
    const original = event.data.data();
    const id = event.params.companyId;
    
    utils.indexRecord('Company', id, original);
  });
  
const onCompanyDeletedIndex = functions.firestore
  .document('Company/{companyId}')
  .onDelete(event => {
    const id = event.params.companyId;
    
    utils.deleteIndex('Company', id);
  });

module.exports = {
  onCompanyCreatedIndex,
  onCompanyupdatedIndex,
  onCompanyDeletedIndex
};
