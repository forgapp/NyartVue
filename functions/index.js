const { onUserCreated, onUserDeleted } = require('./users');
const { 
  onCompanyCreatedIndex,
  onCompanyupdatedIndex,
  onCompanyDeletedIndex 
} = require('./company');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.onUserCreated = onUserCreated;
exports.onUserDeleted = onUserDeleted;

exports.onCompanyCreatedIndex = onCompanyCreatedIndex;
exports.onCompanyupdatedIndex = onCompanyupdatedIndex;
exports.onCompanyDeletedIndex = onCompanyDeletedIndex;
