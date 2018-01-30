import Language from './language';

export default {
  functional: true,
  render: (h, { props: { languages } }) => {
    if (!languages || languages.length === 0) {
      return null;
    }

    const languageElmts = languages.map(language => h(Language, { props: { language } }));

    return h('div', { class: 'field is-grouped is-grouped-multiline' }, languageElmts);
  }
};
