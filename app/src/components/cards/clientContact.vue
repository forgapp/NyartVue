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
  import { DisplayLanguages } from '@/components/languages';

  export default {
    name: 'clientContactCard',
    props: [ 'id', 'record' ],
    components: { DisplayLanguages },
    computed: {
      flagImageUrl() {
        return this.record.NationalityCode ? require(`../../assets/flags/${this.record.NationalityCode.toLowerCase()}.svg`) : '';
      },
      links() {
        return {
          clientContact: `/details/clientContact/${this.id}`,
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
    box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
  }
</style>
