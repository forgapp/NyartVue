<script>
  import Phone from './phone';

  export default {
    functional: true,
    render: (h, { props }) => {
      const { phones } = props;
      const hasResults = phones && phones.length > 0;

      if (!hasResults) {
        return h('div', 'No Phones');
      }

      const phonesList = phones.map(phone => h(
        'div',
        { class: 'column is-12' },
        [ h(Phone, { props: { phone } }) ]
      ));

      return h('div', { class: 'columns is-multiline is-maginless is-gapless' }, phonesList);
    }
  };
// <template>
//   <ul>
//     <li v-if="!hasResults">No Phones</li>
//     <li class="phoneElement" v-for="(phone, index) in phones" :key="index">
//       <div>
//         <span class="icon leftIcon">
//           <i class="fa fa-phone" aria-hidden="true"></i>
//         </span>
//         <a :href="`tel:${phone.Number}`">{{ phone.Number }}</a>
//       </div>
//       <div class="heading" v-if="phone.Type">({{ phone.Type }})</div>
//     </li>
//   </ul>
// </template>

//   export default {
//     name: 'phoneDisplay',
//     props: ['phones'],
//     computed: {
//       hasResults: function () {
//         return this.phones && this.phones.length > 0;
//       }
//     }
//   };
</script>

<style>
  .phoneElement {
    display: flex;
    margin-bottom: 0.5em;
    flex-direction: column;
  }

  .phoneElement .leftIcon {
    margin-right: 0.5em;
  }

  .phoneElement .rigthIcon {
    margin-left: 0.5em;
  }
</style>