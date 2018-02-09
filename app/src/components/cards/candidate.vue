<script>
  import { calculateAge } from '@/lib/date';
  import { DisplayLanguages } from '@/components/languages'; // eslint-disable-line no-unused-vars
  import Flag from '../flag'; // eslint-disable-line no-unused-vars

  export default {
    functional: true,
    render(h, { props: { id, record } }) {
      const age = record.Birthdate
        ? `(${calculateAge(record.Birthdate)} yrs old)`
        : '';
      const links = {
        candidate: id ? `/details/candidate/${id}` : '',
        company: record.Company ? `/details/company/${record.Company.id}` : ''
      };
      const jobFunctionCodes = record.JobFunction
        ? record.JobFunction.reduce((aggr, jobFunction) => {
          if (!aggr[jobFunction.Category]) {
            return Object.assign({}, aggr, { [jobFunction.Category]: [jobFunction.Code] });
          }

          return Object.assign({}, aggr, { [jobFunction.Category]: [
            ...aggr[jobFunction.Category],
            jobFunction.Code
          ] });
        }, {})
        : {};

      return (<div class="box is-fullheight">
        <article class="media">
          <div class="media-left">
            <span class="icon">
              <i class="fa fa-user-o"></i>
            </span>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong class="name"><router-link to={ links.candidate }>{ record.Firstname } { record.Lastname }</router-link></strong> <FlagIcon country={ record.NationalityCode } /> { age && <small>{ age }</small> }
                <br />
                Works { record.JobTitle && `as ${record.JobTitle}` } { record.Company.Name && <span>at <router-link to={ links.company }>{ record.Company.Name }</router-link></span> } { record.Salary && <span>with a base salary of <currency-display value={ record.Salary } symbol="¥" /></span> }
                <br />
                { record.Recruiter.Name && `Registered by ${record.Recruiter.Name}` } { record.RegistrationDate && <small> @{ record.RegistrationDate } }</small> }
              </p>
              { Object.keys(jobFunctionCodes).map(key => (<p key={ key } class="is-marginless">
                { key }: { jobFunctionCodes[key].join(', ') }
              </p>)) }
            </div>
            <DisplayLanguages languages= { record.Languages } />
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
