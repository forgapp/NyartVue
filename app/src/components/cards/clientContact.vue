<script>
  import { DisplayLanguages } from '@/components/languages'; // eslint-disable-line no-unused-vars
  import FlagIcon from '../flagIcon'; // eslint-disable-line no-unused-vars

  export default {
    functional: true,
    render(h, { props: { id, record } }) {
      const links = {
        clientContact: `/details/clientcontact/${id}`,
        company: record.Company && `/details/company/${record.Company.id}`
      };

      return (<div class="box is-fullheight">
        <article class="media">
          <div class="media-left">
            <span class="icon">
              <i class="fa fa-users"></i>
            </span>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong class="name"><router-link to={ links.clientContact }>{ record.Firstname} { record.Lastname}</router-link></strong> <FlagIcon country={ record.NationalityCode } />
                <br />
                Works { record.JobTitle && `as ${record.JobTitle}` } { record.Company.Name && <span>at <router-link to={ links.company }>{ record.Company.Name }</router-link></span> }.
                <br />
                Registered { record.Recruiter.Name && `by ${record.Recruiter.Name}`} { record.RegistrationDate && <small>@{ record.RegistrationDate }</small> }
              </p>
            </div>
            <DisplayLanguages languages={ record.Languages } />
            <p></p>
          </div>
        </article>
      </div>);
    }
  };
</script>

<style scoped>
  .name {
    padding-right: 1.5rem;
  }
</style>
