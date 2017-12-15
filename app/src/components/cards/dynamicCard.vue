<template>
  <!--<candidate-card v-if="isType.candidate" :id="hit._id" :record="hit._source" />-->
  <!--<company-card  v-else-if="isType.company" :id="hit._id" :record="hit._source" />-->
  <!--<job-card v-else-if="isType.job" :id="hit._id" :record="hit._source" />-->
  <!--<client-contact-card v-else-if="isType.clientContact" :id="hit._id" :record="hit._source" />-->
  <!--<div v-else>No Card template.</div>-->
  <component :is="currentCard" :id="hit._id" :record="hit._source"></component>
</template>

<script>
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import CandidateCard from './candidate';
  import ClientContactCard from './clientContact';
  import CompanyCard from './company';
  import JobCard from './job';

  @Component({
    components: { CandidateCard, CompanyCard, JobCard, ClientContactCard }
  })
  class DynamicCard extends Vue {
    @Prop({ default: '' }) index
    @Prop({}) hit

    getCards() {
      return [{
        card: CandidateCard,
        isSelected: this.index === 'contacts' && this.hit._source.Type === 'candidate'
      }, {
        card: ClientContactCard,
        isSelected: this.index === 'contacts' && this.hit._source.Type === 'client contact'
      }, {
        card: CompanyCard,
        isSelected: this.index === 'companies'
      }, {
        card: JobCard,
        isSelected: this.index === 'jobs'
      }];
    }

    get currentCard() {
      const card = this.getCards().filter(card => card.isSelected);

      if (card.length === 0 || card.length > 1) {
        return null;
      }

      return card[0].card;
    }
  }

  export default DynamicCard;
  // import CandidateCard from './candidate';
  // import ClientContactCard from './clientContact';
  // import CompanyCard from './company';
  // import JobCard from './job';

  // export default {
  //   name: 'dynamicCard',
  //   components: { CandidateCard, CompanyCard, JobCard, ClientContactCard },
  //   props: [ 'index', 'hit' ],
  //   computed: {
  //     isType() {
  //       return {
  //         candidate: this.index === 'contacts' && this.hit._source.Type === 'candidate',
  //         clientContact: this.index === 'contacts' && this.hit._source.Type === 'client contact',
  //         company: this.index === 'companies',
  //         job: this.index === 'jobs'
  //       };
  //     }
  //   }
  // };
</script>
