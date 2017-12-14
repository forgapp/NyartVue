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
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <display-languages :languages="record.Languages" />
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
  import { calculateAge } from '@/lib/date';
  import { DisplayLanguages } from '@/components/languages';

  export default {
    name: 'candidateCard',
    props: [ 'id', 'record' ],
    components: { DisplayLanguages },
    computed: {
      flagImageUrl() {
        return this.record.NationalityCode ? require(`../../assets/flags/${this.record.NationalityCode.toLowerCase()}.svg`) : '';
      },
      age() {
        return this.record.Birthdate ? `(${calculateAge(this.record.Birthdate)} yrs old)` : '';
      },
      links() {
        return {
          candidate: `/details/candidate/${this.id}`,
          company: `/details/company/${this.record.Company.id}`
        };
      },
      jobFunctionCodes() {
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

<style scoped>
  .name {
    padding-right: 1.5rem;
  }
  
  .flag {
    box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
  }
</style>
