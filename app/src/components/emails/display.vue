<script>
  import Email from './email';

  export default {
    functional: true,
    render: (h, { props }) => {
      const { emails } = props;
      const hasResults = emails && emails.length > 0;

      if (!hasResults) {
        return h('div', 'No Emails');
      }

      const emailsList = emails.map(email => h(
        'div',
        { class: 'column is-12' },
        [ h(Email, { props: { email } }) ]
      ));

      return h('div', { class: 'columns is-multiline is-maginless is-gapless' }, emailsList);
    }
  };
// <template>
//   <ul>
//     <li v-if="!hasResults">No Emails</li>
//     <li class="emailElement" v-for="(email, index) in emails" :key="index">
//       <div>
//         <span class="icon leftIcon">
//           <i class="fa fa-at" aria-hidden="true"></i>
//         </span>
//         <a :href="`mailto:${email.Address}`">{{ email.Address }}</a>
//       </div>
//       <div v-if="email.Type" class="heading">({{ email.Type }})</div>
//     </li>
//   </ul>
// </template>

//   export default {
//     name: 'EmailsDisplay',
//     props: ['emails'],
//     computed: {
//       hasResults: function () {
//         return this.emails && this.emails.length > 0;
//       }
//     }
//   };
</script>

<style>
  .emailElement {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5em;
  }

  .emailElement .leftIcon {
    margin-right: 0.5em;
  }

  .emailElement .rigthIcon {
    margin-left: 0.5em;
  }
</style>