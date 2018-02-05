const functions = require('firebase-functions');
const elastic = require('./lib/elastic');

function removeRef(info) {
  return Object.keys(info)
    .filter(key => key.toLowerCase() !== 'ref')
    .reduce((aggr, current) => {
      return Object.assign({}, aggr, { [current]: info[current] });
    }, {});
}

const onJobCreatedIndex = functions.firestore
  .document('Job/{jobId}')
  .onCreate(event => {
    const original = event.data.data();
    const id = event.params.jobId;
    const recordToIndex = Object.assign({}, original, {
      Company: removeRef(original.Company),
      ClientContact: removeRef(original.ClientContact)
    });

    return elastic.indexRecord('jobs', 'doc', id, recordToIndex);
  });

const onJobupdatedIndex = functions.firestore
  .document('Job/{jobId}')
  .onUpdate(event => {
    const original = event.data.data();
    const id = event.params.jobId;
    const recordToIndex = Object.assign({}, original, {
      Company: removeRef(original.Company),
      ClientContact: removeRef(original.ClientContact)
    });

    return elastic.indexRecord('jobs', 'doc', id, recordToIndex);
  });

const onJobDeletedIndex = functions.firestore
  .document('Job/{jobId}')
  .onDelete(event => {
    const id = event.params.jobId;

    return elastic.deleteRecord('job', 'doc', id);
  });

module.exports = {
  onJobCreatedIndex,
  onJobupdatedIndex,
  onJobDeletedIndex
};
