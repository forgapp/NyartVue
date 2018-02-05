const { onUserCreated, onUserChanged, onUserDeleted, onUserDeletedIndex } = require('./users');
const {
  onCompanyCreatedIndex,
  onCompanyupdatedIndex,
  onCompanyDeletedIndex
} = require('./company');

const {
  onCandidateCreatedIndex,
  onCandidateUpdatedIndex,
  onCandidateDeletedIndex
} = require('./candidate');

const {
  onClientContactCreatedIndex,
  onClientContactUpdatedIndex,
  onClientContactDeletedIndex
} = require('./clientContact');

const {
  onJobCreatedIndex,
  onJobupdatedIndex,
  onJobDeletedIndex
} = require('./job');


const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// exports.onUserCreated = onUserCreated;
exports.onUserChanged = onUserChanged;
exports.onUserDeletedIndex = onUserDeletedIndex;
// exports.onUserDeleted = onUserDeleted;

exports.onCompanyCreatedIndex = onCompanyCreatedIndex;
exports.onCompanyupdatedIndex = onCompanyupdatedIndex;
exports.onCompanyDeletedIndex = onCompanyDeletedIndex;

exports.onCandidateCreatedIndex = onCandidateCreatedIndex;
exports.onCandidateUpdatedIndex = onCandidateUpdatedIndex;
exports.onCandidateDeletedIndex = onCandidateDeletedIndex;

exports.onJobCreatedIndex = onJobCreatedIndex;
exports.onJobupdatedIndex = onJobupdatedIndex;
exports.onJobDeletedIndex = onJobDeletedIndex;

exports.onClientContactCreatedIndex = onClientContactCreatedIndex;
exports.onClientContactUpdatedIndex = onClientContactUpdatedIndex;
exports.onClientContactDeletedIndex = onClientContactDeletedIndex;
