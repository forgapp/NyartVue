<template>
  <div class="columns">
   <div class="column is-one-quarter">
     <aside class="menu">
       <p class="menu-label">Resumes</p>
       <ul class="menu-list">
         <li v-for="(resume, id) in resumes" :key="id">
           <a class="is-clearfix">
             {{ resume.Name }}
             <button @click="deleteResume(resume.Name, id)" class="button is-small is-pulled-right">
               <span class="icon is-small">
                 <i class="fa fa-trash"></i>
               </span>
             </button>
           </a>
         </li>
       </ul>
     </aside>
   </div>

   <div class="column">
     <div class="field">
       <div class="file is-info is-large is-centered">
         <label class="file-label">
           <input class="file-input" multiple type="file" name="resume" @change="handleChange"  />
           <span class="file-cta">
             <span class="file-icon">
               <i class="fa fa-upload"></i>
             </span>
             <span class="file-label">
               Click here or drag resumes.
             </span>
           </span>
         </label>
       </div>
     </div>
     <ul>
       <li v-for="uploadTask in uploadTasks">
         {{ uploadTask.Name }}
         <progress class="progress is-info" :value="uploadTask.Transfered" max="100">
           {{ uploadTask.Transfered }}%
         </progress>
       </li>
     </ul>
   </div>
 </div>
  
</template>

<script>
  import { firestore, storage } from '@/lib/firebase';
  
  export default {
    name: 'ResumesEditor',
    props: [ 'id' ],
    data() {
      return {
        resumes: {},
        uploadTasks: []
      };
    },
    beforeMount: function () {
      this.resumeUnsubscribe = this.getResumeSubscription();
    },
    beforeDestroy: function () {
      this.resumeUnsubscribe();
    },
    computed: {
      storageRef: function () {
        return storage.ref('/resumes')
          .child(this.id);
      },
      resumesRef: function () {
        return firestore.collection('Candidate')
          .doc(this.id)
          .collection('resumes');
      }
    },
    methods: {
      getResumeSubscription() {
        return this.resumesRef
          .onSnapshot(querySnapshot => {
            var resumes = {};

            querySnapshot.forEach(doc => {
              resumes = Object.assign(
                {},
                resumes,
                { [doc.id]: doc.data() }
              );
            });

            this.resumes = resumes;
          });
      },
      handleChange(event) {
        this.uploadTasks = [];
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          const uploadTask = this.storageRef.child(file.name)
            .put(file, { contentType: file.type });

          uploadTask.on('state_changed', snapshot => {
            const transfered = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            const newFile = {
              Name: file.name,
              Transfered: transfered
            };
            console.log('state_changed', transfered);

            this.uploadTasks = [
              ...this.uploadTasks.slice(0, i),
              newFile,
              ...this.uploadTasks.slice(i + 1, this.uploadTasks.length)
            ];
          });

          uploadTask.then(snapshot => {
            firestore.collection('Candidate')
              .doc(this.id)
              .collection('resumes')
              .add({
                Name: file.name,
                Url: snapshot.downloadURL
              });
          });
        }
      },
      deleteResume(filename, databaseKey) {
        console.log(filename, databaseKey);
        this.storageRef.child(filename)
          .delete().then(() => {
            this.resumesRef
              .doc(databaseKey)
              .delete();
          });
      }
    }
  };
</script>
