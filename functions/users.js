const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { indexRecord } = require('./utils');

// admin.initializeApp(functions.config().firebase);

const onUserCreated = functions.auth.user()
  .onCreate(event => {
    const user = event.data;

    return admin.firestore()
      .collection("Users")
      .doc(user.uid)
      .set({
        Profile: {
          Lastname: '',
          Firstname: '',
          email: user.email
        },
        Permissions: {
          Administrator: false,
          Authorized: false
        }
      });
  });

const onUserDeleted = functions.auth.user()
  .onDelete(event => {
    const user = event.data;

    return admin.firestore()
      .collection("/Users")
      .doc(user.uid)
      .delete();
});

const onUserChanged = functions.firestore
  .document('Users/{userId}')
  .onUpdate(event => {
    return Promise.all([
      indexUser(event),
      modifyElasticAuthorization(event)
    ]);
  });

function indexUser(event) {
  const userId = event.params.userId;
  const newData = event.data.data();
  const oldData = event.data.previous.data();

  if (!isProfileChanged(newData.Profile, oldData.Profile)) {
    return Promise.resolve();
  }

  const profile = Object(
    { Type: 'user' },
    newData.Profile
  );

  return indexRecord('config', 'doc', userId, profile);
}

function isProfileChanged(newProfile, oldProfile) {
  if (Object.keys(newProfile).length !== Object.keys(oldProfile).length) {
    return true;
  }

  return Object.keys(newProfile).some(key => {
    return newProfile[key] != oldProfile[key];
  });
}


function modifyElasticAuthorization() {
  // const userId = event.params.userId;
  const newData = event.data.data();
  const oldData = event.data.previous.data();

  if (newData.Permissions.Authorized === oldData.Permissions.Authorized) {
    return Promise.resolve();
  }

  return Promise.resolve();
}

// exports.onUserAuthorized = functions.database
//   .ref('Users/{userId}/Permissions/Authorized')
//   .onWrite(event => {
//     const userId = event.params.userId;
//     const isAuthorized = event.data.val();
//     const userPermissionsRef = event.data.ref.parent;

//     sendNotificationToAdmins(userId, isAuthorized);

//     return admin.database()
//       .ref("Users")
//       .child(userId)
//       .once('value').then(snapshot => {
//         const user = snapshot.val();
//         const elasticUrl = functions.config().elastic.url;
//         const elasticKey = functions.config().elastic.key;
//         const pwd = uid(20);
//         const elaticUser = {
//           password: pwd,
//           roles: ["nyart_user"],
//           full_name: `${user.Profile.Firstname} ${user.Profile.Lastname}`
//         };

//         if (isAuthorized) {
//           return Promise.all([
//             fetch(`${elasticUrl}/_xpack/security/user/${user.Profile.Username}`, {
//               method: 'POST',
//               body: JSON.stringify(elaticUser),
//               headers: { 'Authorization': `Basic ${elasticKey}` }
//             }),
//             fetch(`${elasticUrl}/config/user/${userId}`, {
//               method: 'PUT',
//               body: JSON.stringify(user.Profile),
//               headers: { 'Authorization': `Basic ${elasticKey}` }
//             })
//           ]).then(response => {
//             userPermissionsRef
//               .child('elasticKey')
//               .set(Buffer.from(`${user.Profile.Username}:${pwd}`).toString('base64'));
//           })
//           .catch(error => console.log(error));
//         } else {
//           return Promise.all([
//             fetch(`${elasticUrl}/_xpack/security/user/${user.Profile.Username}`, {
//               method: 'DELETE',
//               headers: { 'Authorization': `Basic ${elasticKey}` }
//             }),
//             fetch(`${elasticUrl}/config/user/${userId}`, {
//               method: 'DELETE',
//               headers: { 'Authorization': `Basic ${elasticKey}` }
//             })
//           ]).then(response => {
//             userPermissionsRef
//               .child('elasticKey')
//               .remove();
//           })
//           .catch(error => console.log(error));
//         }
//       });
//   });

module.exports  = {
  onUserCreated,
  onUserChanged,
  onUserDeleted
};
