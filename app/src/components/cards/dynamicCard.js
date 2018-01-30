import CandidateCard from './candidate';
import ClientContactCard from './clientContact';
import CompanyCard from './company';
import JobCard from './job';

export default {
  functional: true,
  render(h, { props }) {
    let component = null;
    const { index, hit: { _id, _source } } = props;
    const is = {
      candidate: index === 'contacts' && _source.Type === 'candidate',
      clientContact: index === 'contacts' && _source.Type === 'client contact',
      company: index === 'companies',
      job: index === 'jobs'
    };

    if (is.candidate) {
      component = CandidateCard;
    } else if (is.clientContact) {
      component = ClientContactCard;
    } else if (is.company) {
      component = CompanyCard;
    } else if (is.job) { component = JobCard; }

    return h(component, { props: { id: _id, record: _source } });
  }
};
