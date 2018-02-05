<template>
  <div class="box is-fullheight">
    <article class="media">
      <div class="media-left">
        <span class="icon">
          <i class="fa fa-briefcase"></i>
        </span>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong><router-link :to="links.job">{{ record.JobTitle }}</router-link></strong> <small> {{ record.Status }}</small>
            <br />
            Job for <router-link :to="links.company">{{ record.Company.Name }}</router-link> followed by <router-link :to="links.clientContact">{{ record.ClientContact.Name }}</router-link> with a salary range of <currency-display :value="record.SalaryMinimum" symbol="¥" /> - <currency-display :value="record.SalaryMaximum" symbol="¥" />
            <br />
            {{ record.Recruiter.Name && `Registered by ${record.Recruiter.Name}` }} <small>{{ record.RegistrationDate && `@${record.RegistrationDate}` }}</small>
          </p>
          <p v-for="(code, key) in jobFunctionCodes" :key="key" class="is-marginless">
            {{ key }}: {{ code.join(', ') }}
          </p>
        </div>
        <display-languages :languages="record.Languages" />
        <p></p>
      </div>
    </article>
  </div>
</template>

<script>
  import { DisplayLanguages } from '@/components/languages';

  export default {
    name: 'jobCard',
    props: [ 'id', 'record' ],
    components: { DisplayLanguages },
    computed: {
      links() {
        return {
          job: `/details/job/${this.id}`,
          company: `/details/company/${this.record.Company.id}`,
          clientContact: `/details/clientContact/${this.record.ClientContact.id}`
        };
      },
      jobFunctionCodes: function () {
        return this.record.JobFunction ? this.record.JobFunction.reduce((aggr, jobFunction) => {
          if (!aggr[jobFunction.Category]) {
            return Object.assign({}, aggr, { [jobFunction.Category]: [jobFunction.Code] });
          }

          return Object.assign({}, aggr, { [jobFunction.Category]: [
            ...aggr[jobFunction.Category],
            jobFunction.Code
          ] });
        }, {}) : {};
      }
    }
  };
</script>
