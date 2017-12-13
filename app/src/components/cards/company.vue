<template>
  <div class="box is-fullheight">
    <article class="media">
      <div class="media-left">
        <span class="icon">
          <i class="fa fa-building-o"></i>
        </span>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong><router-link :to="companyLink">{{ record.Name }}</router-link></strong>
            <br />
            {{ record.Recruiter.Name && `Registered by ${record.Recruiter.Name}` }} <small>{{ record.RegistrationDate && `@${record.RegistrationDate}` }}</small>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'companyCard',
    props: [ 'id', 'record' ],
    computed: {
      companyLink: function () {
        return `/details/company/${this.id}`;
      },
      recruiterName: function () {
        return this.record.Recruiter && this.record.Recruiter.Name && `by ${this.record.Recruiter.Name}`;
      },
      registrationDate: function () {
        return this.record.RegistrationDate && `@${this.record.RegistrationDate}`;
      }
    }
  };
</script>
