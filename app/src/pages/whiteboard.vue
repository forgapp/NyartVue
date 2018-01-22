<template>
  <div class="container is-fluid is-fullheight">
    <div class="section">
      <h3 class="title is-4">
        Whiteboard
      </h3>
    </div>
    <div class="section">
      <div class="columns">
        <div class="column">
          <h3 class="title is-6">Applications</h3>
          <div v-for="process in processes.application" :key="process.id">{{ process.id }}</div>
        </div>

        <div class="column">
          <div class="box">
            <h3 class="title is-6">CCM1</h3>
            <process-card
              v-for="process in processes.ccm1"
              :key="process.id"
              :process="process"
              @open-ats="openDrawer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--<div class="whiteboard">-->
  <!--  Whiteboard.<br />-->
  <!--  <div class="columns">-->
  <!--    <div class="column">-->
  <!--      <h3 class="title is-6">Applications</h3>-->
  <!--      <div v-for="process in processes.application" :key="process.id">{{ process.id }}</div>-->
  <!--    </div>-->

  <!--    <div class="column">-->
  <!--      <h3 class="title is-6">Submittals</h3>-->
  <!--      <div v-for="process in processes.submittal" :key="process.id">{{ process.id }}</div>-->
  <!--    </div>-->

  <!--    <div class="column">-->
  <!--      <div class="box">-->
  <!--        <h3 class="title is-6">CCM1</h3>-->
  <!--        <process-card-->
  <!--          v-for="process in processes.ccm1"-->
  <!--          :key="process.id"-->
  <!--          :process="process"-->
  <!--          @open-ats="openDrawer"-->
  <!--        />-->
  <!--      </div>-->
  <!--    </div>-->

  <!--    <div class="column">-->
  <!--      <h3 class="title is-6">CCM2+</h3>-->
  <!--      <div v-for="process in processes.ccm" :key="process.id">{{ process.id }}</div>-->
  <!--    </div>-->

  <!--    <div class="column">-->
  <!--      <h3 class="title is-6">Offer</h3>-->
  <!--      <div v-for="process in processes.offer" :key="process.id">{{ process.id }}</div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <div :class="overlayClass" @click="closeDrawer"></div>-->
  <!--  <div :class="drawerClass">-->
  <!--    <ats v-if="isDrawerOpen" type="Job" :process="selectedProcess" />-->
  <!--  </div>-->
  <!--</div>-->
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import { getCurrentStage, getPreviousStage } from '@/lib/atsStages';
  import { set, del } from '@/lib/immutable';
  import ProcessCard from '@/components/cards/process';
  import Ats from '@/components/ats';

  @Component({ components: { Ats, ProcessCard } })
  class Whiteboard extends Vue {
    processes = {}
    selectedProcess = {};

    beforeMount() {
      this.unsubscribe = this.getProcessSubscription();
    }

    beforeDestroy() {
      this.unsubscribe();
    }

    get isDrawerOpen() {
      return Object.keys(this.selectedProcess).length > 0;
    }

    get drawerClass() {
      return {
        drawer: true,
        'is-closed': !this.isDrawerOpen,
        'is-open': this.isDrawerOpen
      };
    }

    get overlayClass() {
      return {
        // 'is-overlay': true,
        'whiteboard-overlay': true,
        'show': this.isDrawerOpen
      };
    }

    // get processesByStage() {
    //   return {
    //     Application: this.processes.filter(process => getCurrentStage(process) === 'application'),
    //     Submittal: this.processes.filter(process => getCurrentStage(process) === 'submittal')
    //   };
    // }

    getProcessSubscription() {
      return firestore.collection('Process')
        .where('Status', '==', 'In Progress')
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges.forEach(this.setProcess);
        });
    }

    setProcess(change) {
      const { type, doc } = change;
      console.log(type, doc);

      if (type === 'added') {
        const process = {
          id: doc.id,
          ...doc.data()
        };
        const currentStage = getCurrentStage(process);

        this.processes = set(this.processes, [currentStage, process.id], process);

        // this.processes = Object.assign(
        //   {},
        //   this.processes,
        //   {
        //     [currentStage]: Object.assign(
        //       {},
        //       this.processes[currentStage],
        //       { [process.id]: process }
        //     )
        //   }
        // );
      }

      if (type === 'removed') {
        const processId = doc.id;
        const currentStage = getCurrentStage(doc.data());
        this.processes = del(this.processes, [currentStage, processId]);
      }

      if (type === 'modified') {
        const process = {
          id: doc.id,
          ...doc.data()
        };
        const previousStage = getPreviousStage(process);
        const currentStage = getCurrentStage(process);

        this.processes = set(
          del(this.processes, [previousStage, process.id]),
          [currentStage, process.id],
          process
        );
      }

      console.log(this.processes);
    }

    openDrawer(id) {
      this.selectedProcessUnsubscribe = this.getProcessById(id);
      console.log(this.selectedProcess);
    }

    closeDrawer() {
      this.selectedProcess = {};
      this.selectedProcessUnsubscribe();
    }

    getProcessById(id) {
      return firestore.collection('Process')
        .doc(id)
        .onSnapshot(querySnapshot => {
          this.selectedProcess = {
            id,
            ...querySnapshot.data()
          };
        });
    }
  }

  export default Whiteboard;
</script>

<style scoped>
  .whiteboard {
    position: relative;
  }

  .whiteboard-overlay {
    /*background-color: rgba(10, 10, 10, 0.86);*/
    /*z-index: 101;*/
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.4);
    transition-property: opacity;
    transition-timing-function: ease-in-out;
    transition-duration: 250ms;
    /*transition-delay: 150ms;*/
  }

  .whiteboard-overlay.show {
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 2;
  }

  .drawer {
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    visibility: hidden;
    transition-property: all;
    transition-duration: 250ms;
    transition-timing-function: ease-out;
    width: 45%;
    left: auto;
    right: 0;
    z-index: 3;
  }

  .drawer.is-closed {
    transform: translate3d(100%, 0, 0);
  }

  .drawer.is-open {
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
</style>
