const functions = require('firebase-functions');
const admin = require('firebase-admin');

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

module.exports  = {
  onUserCreated,
  onUserDeleted
};
