<template>
  <div class="box is-fullheight">
    <article class="media">
      <div class="media-left">
        <span class="icon">
          <i class="fa fa-users"></i>
        </span>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong class="name"><router-link :to="links.clientContact">{{ record.Firstname }} {{ record.Lastname }}</router-link></strong> <small><span class="icon"><img class="flag" :src="flagImageUrl" /></span></small>
            <br />
            Works as {{ record.JobTitle }} at <router-link :to="links.company">{{ record.Company.Name }}</router-link>.
            <br />
            {{ record.Recruiter.Name && `Registered by ${record.Recruiter.Name}` }} <small>{{ record.RegistrationDate && `@${record.RegistrationDate}` }}</small>
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
    name: 'clientContactCard',
    props: [ 'id', 'record' ],
    components: { DisplayLanguages },
    computed: {
      flagImageUrl() {
        return this.record.NationalityCode ? `/static/img/flags/${this.record.NationalityCode.toLowerCase()}.svg` : '';
        // return this.record.NationalityCode ? require(`../../assets/flags/${this.record.NationalityCode.toLowerCase()}.svg`) : '';
      },
      links() {
        return {
          clientContact: `/details/clientcontact/${this.id}`,
          company: `/details/company/${this.record.Company.id}`
        };
      }
    }
  };
</script>

<style scoped>
  .name {
    padding-right: 1.5rem;
  }

  .flag {
    border: 1px solid hsla(0, 0%, 75%, 1);
  }
</style>
