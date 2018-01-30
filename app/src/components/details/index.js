import Candidate from './candidate';
import Company from './company';
import ClientContact from './clientContact';
import Job from './job';

export default {
  functional: true,
  render(h, { props }) {
    const { type, id } = props;
    const layouts = {
      candidate: Candidate,
      company: Company,
      clientcontact: ClientContact,
      job: Job
    };

    return h(layouts[type], { props: { id } });
  }
};
