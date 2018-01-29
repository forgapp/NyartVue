<script>
  import Candidate from './candidate';
  import Company from './company';
  import ClientContact from './clientContact';
  import Job from './job';

  export default {
    name: 'detail-layout',
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
// <template>
//   <component :is="layout" :id="id"></component>
// </template>

//   import Vue from 'vue';
//   import { Component, Prop } from 'vue-property-decorator';
//   import Candidate from './candidate';
//   import Company from './company';
//   import ClientContact from './clientContact';
//   import Job from './job';

//   @Component({})
//   class DetailsLayout extends Vue {
//     @Prop({ default: '' }) type
//     @Prop({}) id

//     getLayouts() {
//       return {
//         candidate: Candidate,
//         company: Company,
//         clientcontact: ClientContact,
//         job: Job
//       };
//     }

//     get layout() {
//       const layouts = this.getLayouts();
//       const layout = layouts[this.type];

//       if (!layout) {
//         return null;
//       }

//       return layout;
//     }
//   }

//   export default DetailsLayout;
</script>