<template>
  <div class="box is-fullheight">
    <article class="media">
      <div class="media-left">
        <span class="icon">
          <i class="fa fa-user-o"></i>
        </span>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong class="name"><router-link :to="links.candidate">{{ record.Firstname }} {{ record.Lastname }}</router-link></strong> <small><span class="icon"><img class="flag" :src="flagImageUrl" /></span></small> <small>{{ age }}</small>
            <br />
            Works as {{ record.JobTitle }} at <router-link :to="links.company">{{ record.Company.Name }}</router-link> with a base salary of <currency-display :value="record.Salary" symbol="¥" />
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
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { calculateAge } from '@/lib/date';
  import { DisplayLanguages } from '@/components/languages';

  @Component({
    components: { DisplayLanguages }
  })
  class CandidateCard extends Vue {
    @Prop({ default: '' }) id
    @Prop({ default: {} }) record

    get flagImageUrl() {
      const code = this.record.NationalityCode;

      return code ? `/static/img/flags/${code.toLowerCase()}.svg` : '';
    }

    get age() {
      return this.record.Birthdate ? `(${calculateAge(this.record.Birthdate)} yrs old)` : '';
    }

    get links() {
      return {
        candidate: this.id ? `/details/candidate/${this.id}` : '',
        company: this.record.Company ? `/details/company/${this.record.Company.id}` : ''
      };
    }

    get jobFunctionCodes() {
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

  export default CandidateCard;
</script>

<style scoped>
  .name {
    padding-right: 1.5rem;
  }

  .flag {
    border: 1px solid hsla(0, 0%, 75%, 1);
  }
</style>
