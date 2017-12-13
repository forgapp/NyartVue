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
            <strong><router-link :to="links.clientContact">{{ record.Firstname }} {{ record.Lastname }}</router-link></strong> <small>{{ record.Nationality }}</small>
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
      links() {
        return {
          clientContact: `/details/clientContact/${this.id}`,
          company: `/details/company/${this.record.Company.id}`
        };
      }
    }
  };
</script>
