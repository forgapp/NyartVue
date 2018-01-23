<template>
  <div class="container is-fluid is-scrollable">
    <div class="section">
      <div class="columns">
        <div class="column is-3">
          <div class="box">
            <stat-selector
              :period="period"
              :recruiter="recruiter"
              @period-changed="handlePeriodChange"
              @recruiter-changed="handleRecruiterChange"
              @refresh="retrieveStats"
            />
						<div class="columns is-multiline is-gapless is-mobile">
              <div class="column is-half">
                <div class="stat">
                  <p class="heading">Companies</p>
                  <p class="title">{{ stats.companies }}</p>
                </div>
              </div>
              <div class="column is-half">
                <div class="stat">
                  <p class="heading">Candidates</p>
                  <p class="title">{{ stats.candidate }}</p>
                </div>
              </div>
              <div class="column is-half">
                <div class="stat">
                  <p class="heading">Client Contacts</p>
                  <p class="title">{{ stats.client_contact }}</p>
                </div>
              </div>
              <div class="column is-half">
                <div class="stat">
                  <p class="heading">Jobs</p>
                  <p class="title">{{ stats.jobs }}</p>
                </div>
              </div>
          </div>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <div class="notification">
						  New Features will be added here soon.
						</div>
						<div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
            <div>Home</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--<div class="container is-fluid is-scrollable">-->
  <!--  <div class="section">-->


    <!--  <div class="columns">-->
				<!--<div class="column is-9">-->
			<!--		<div class="columns">-->
			<!--			<div class="column is-4">-->
			<!--			  <div class="box">-->
			<!--			    <stat-selector-->
   <!--               :period="period"-->
   <!--               :recruiter="recruiter"-->
   <!--               @period-changed="handlePeriodChange"-->
   <!--               @recruiter-changed="handleRecruiterChange"-->
   <!--               @refresh="retrieveStats"-->
   <!--             />-->
  	<!--						<div class="columns is-multiline is-gapless is-mobile">-->
   <!--               <div class="column is-half">-->
   <!--                 <div class="stat">-->
   <!--                   <p class="heading">Companies</p>-->
   <!--                   <p class="title">{{ stats.companies }}</p>-->
   <!--                 </div>-->
   <!--               </div>-->
   <!--               <div class="column is-half">-->
   <!--                 <div class="stat">-->
   <!--                   <p class="heading">Candidates</p>-->
   <!--                   <p class="title">{{ stats.candidate }}</p>-->
   <!--                 </div>-->
   <!--               </div>-->
   <!--               <div class="column is-half">-->
   <!--                 <div class="stat">-->
   <!--                   <p class="heading">Client Contacts</p>-->
   <!--                   <p class="title">{{ stats.client_contact }}</p>-->
   <!--                 </div>-->
   <!--               </div>-->
   <!--               <div class="column is-half">-->
   <!--                 <div class="stat">-->
   <!--                   <p class="heading">Jobs</p>-->
   <!--                   <p class="title">{{ stats.jobs }}</p>-->
   <!--                 </div>-->
   <!--               </div>-->
   <!--             </div>-->
   <!--           </div>-->
			<!--			</div>-->
			<!--			<div class="column is-9">-->
			<!--				<div class="notification">-->
			<!--				  New Features will be added here soon.-->
			<!--				</div>-->
			<!--				<div>Home</div>-->

   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Home</div>-->
   <!--           <div>Last</div>-->
			<!--			</div>-->
			<!--		</div>-->
			<!--	</div>-->
			<!--</div>-->

  <!--  </div>-->
  <!--</div>-->
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import Elastic from '@/lib/elastic';
  import StatSelector from '@/components/statSelector';

  @Component({
    components: { StatSelector }
  })
  class Home extends Vue {
    period = 'THIS_FQ'
    recruiter = {}
    stats = {}

    beforeMount() {
      const user = this.$store.state.app.user;
      this.recruiter = {
        Name: user.displayName,
        id: user.id
      };

      this.retrieveStats();
    }

    get isStatsLoading() {
      return Object.keys(this.stats) === 0;
    }

    handlePeriodChange(period) { this.period = period; }
    handleRecruiterChange(recruiter) { this.recruiter = recruiter; }
    retrieveStats() {
      this.stats = {};
      console.log(this.period, this.recruiter);
      Promise.all([
        this.retrieveCompaniesStats(),
        this.retrieveContactStats(),
        this.retrieveJobsStats()
      ]).then(([ companies, contacts, jobs ]) => {
        this.stats = {
          ...companies,
          ...contacts,
          ...jobs
        };
      });
    }

    retrieveCompaniesStats() {
      if (!this.recruiter.id) {
        return;
      }

      const elastic = new Elastic()
        .setIndex('companies')
        .query({
          'query': {
            'term': { 'Recruiter.id': this.recruiter.id }
          }
        });

      return elastic.count()
        .then(({ count }) => {
          return { companies: count };
        });
    }

    retrieveJobsStats() {
      if (!this.recruiter.id) {
        return;
      }

      const elastic = new Elastic()
        .setIndex('jobs')
        .query({
          'query': {
            'term': { 'Recruiter.id': this.recruiter.id }
          }
        });

      return elastic.count()
        .then(({ count }) => {
          return { jobs: count };
        });
    }

    retrieveContactStats() {
      if (!this.recruiter.id) {
        return;
      }

      const elastic = new Elastic()
        .setIndex('contacts')
        .query({
          'aggs': {
            'Type': { 'terms': { 'field': 'Type' } }
          }
        });

      return elastic.searchWithBody()
        .then(({ aggregations }) => {
          const stats = aggregations
            .Type
            .buckets
            .reduce((aggr, curr) => {
              return Object.assign({}, aggr, {
                [curr.key.replace(/\s/g, '_')]: curr.doc_count
              });
            }, {});

          return stats;
        });
    }
  }

  export default Home;
</script>

<style>
  .is-scrollable {
    height: 100%;
    overflow: auto;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
  }
</style>
