<script>
  export default {
    functional: true,
    render(h, { props: { id, record } }) {
      const companyLink = `/details/company/${id}`;
      const recruiterName = record.Recruiter && record.Recruiter.Name;
      const registrationDate = record.RegistrationDate && `@${record.RegistrationDate}`;

      return (<div class="box is-fullheight">
        <article class="media">
          <div class="media-left">
            <span class="icon">
              <i class="fa fa-building-o"></i>
            </span>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong><router-link to={ companyLink }>{ record.Name }</router-link></strong>
                <br />
                { recruiterName && `Registered by ${recruiterName}` } <small>{ registrationDate }</small>
              </p>
            </div>
          </div>
        </article>
      </div>);
    }
  };
</script>
