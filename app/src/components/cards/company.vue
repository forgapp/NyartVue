<template>
  <div class="card">
    <header class="card-header">
      <div class="card-header-icon">
        <span class="icon">
          <i class="fa fa-building-o"></i>
        </span>
      </div>
      <p class="card-header-title">
         <router-link :to="companyLink">{{ record.Name }}</router-link>
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <div>
        {{ recruiterName }} <small>{{ registrationDate }}</small>
        </div>
      </div>
    </div>
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