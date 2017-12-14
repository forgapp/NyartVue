exports.onUserChanged = functions.database
  .ref('Users/{userId}/Profile')
  .onWrite(event => {
    const userId = event.params.userId;
    const elasticUrl = functions.config().elastic.url;
    const elasticKey = functions.config().elastic.key;
    const profile = event.data.val();
    const updateAuthUser = () => admin.auth().updateUser(userId, {
      displayName: `${profile.Firstname} ${profile.Lastname}`,
    });
    const indexUser = () => fetch(`${elasticUrl}/config/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
      headers: { 'Authorization': `Basic ${elasticKey}` }
    });

    return Promise.all([
      updateAuthUser(),
      indexUser()
    ]).then(function(userRecord) {
      console.log("Successfully updated user");
    })
    .catch(function(error) {
      console.log("Error updating user:", error);
    });
  })

exports.onUserAuthorized = functions.database
  .ref('Users/{userId}/Permissions/Authorized')
  .onWrite(event => {
    const userId = event.params.userId;
    const isAuthorized = event.data.val();
    const userPermissionsRef = event.data.ref.parent;

    sendNotificationToAdmins(userId, isAuthorized);

    return admin.database()
      .ref("Users")
      .child(userId)
      .once('value').then(snapshot => {
        const user = snapshot.val();
        const elasticUrl = functions.config().elastic.url;
        const elasticKey = functions.config().elastic.key;
        const pwd = uid(20);
        const elaticUser = {
          password: pwd,
          roles: ["nyart_user"],
          full_name: `${user.Profile.Firstname} ${user.Profile.Lastname}`
        };

        if (isAuthorized) {
          return Promise.all([
            fetch(`${elasticUrl}/_xpack/security/user/${user.Profile.Username}`, {
              method: 'POST',
              body: JSON.stringify(elaticUser),
              headers: { 'Authorization': `Basic ${elasticKey}` }
            }),
            fetch(`${elasticUrl}/config/user/${userId}`, {
              method: 'PUT',
              body: JSON.stringify(user.Profile),
              headers: { 'Authorization': `Basic ${elasticKey}` }
            })
          ]).then(response => {
            userPermissionsRef
              .child('elasticKey')
              .set(Buffer.from(`${user.Profile.Username}:${pwd}`).toString('base64'));
          })
          .catch(error => console.log(error));
        } else {
          return Promise.all([
            fetch(`${elasticUrl}/_xpack/security/user/${user.Profile.Username}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Basic ${elasticKey}` }
            }),
            fetch(`${elasticUrl}/config/user/${userId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Basic ${elasticKey}` }
            })
          ]).then(response => {
            userPermissionsRef
              .child('elasticKey')
              .remove();
          })
          .catch(error => console.log(error));
        }
      });
  });

function sendNotificationToAdmins(userId ,isAuthorized) {
  const getToken = admin.database().ref('Users')
    .once('value')
    .then(snapshot => {
      const tokens = [];

      snapshot.forEach(snapshot => {
        const user = snapshot.val();
        if (user.Permissions.messagingToken && user.Permissions.Administrator) {
          tokens.push(user.Permissions.messagingToken);
        }
      });

      return tokens;
    });
  const getAuthorizedUser = admin.database().ref('Users')
    .child(userId)
    .child('Profile')
    .once('value')
    .then(snapshot => snapshot.val());

  Promise.all([
    getToken,
    getAuthorizedUser
  ]).then(([ tokens, authorizedUser ]) => {
    const payload = {
      notification: {
        title: isAuthorized ? 'Authorized' : 'Revoked',
        body: `${authorizedUser.Firstname} ${authorizedUser.Lastname} (${authorizedUser.email}) has been ${isAuthorized ? 'authorized' : 'revoked'}`
      }
    };

    if(tokens.length > 0) {
      admin.messaging().sendToDevice(tokens, payload)
        .catch(error => console.log(error));
    }
  });
}