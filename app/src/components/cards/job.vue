<script>
  import { DisplayLanguages } from '@/components/languages'; // eslint-disable-line no-unused-vars
  import { CodesDisplay } from '../codes'; // eslint-disable-line no-unused-vars

  export default {
    functional: true,
    render(h, { props: { id, record } }) {
      const links = {
        job: `/details/job/${id}`,
        company: record.Company && `/details/company/${record.Company.id}`,
        clientContact: record.ClientContact && `/details/clientContact/${record.ClientContact.id}`
      };

      return (<div class="box is-fullheight">
        <article class="media">
          <div class="media-left">
            <span class="icon">
              <i class="fa fa-briefcase"></i>
            </span>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong><router-link to={ links.job }>{ record.JobTitle }</router-link></strong> <small> { record.Status }</small>
                <br />
                Job for <router-link to={ links.company }>{ record.Company.Name }</router-link> followed by <router-link to={ links.clientContact }>{ record.ClientContact.Name }</router-link> with a salary range of <currency-display value={ record.SalaryMinimum } symbol="¥" /> - <currency-display value={ record.SalaryMaximum } symbol="¥" />
                <br />
                { record.Recruiter.Name && `Registered by ${record.Recruiter.Name}` } <small>{ record.RegistrationDate && `@${record.RegistrationDate}` }</small>
              </p>
              <CodesDisplay codes={ record.JobFunction } />
            </div>
            <DisplayLanguages languages={ record.Languages } />
            <p></p>
          </div>
        </article>
      </div>);
    }
  };
</script>
