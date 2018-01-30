export default {
  functional: true,
  render: (h, { props: { language } }) => h('div', { class: 'control' }, [
    h('div', { class: 'tags has-addons' }, [
      h('span', { class: 'tag is-dark' }, language.Language),
      h('span', { class: 'tag is-info' }, language.Level)
    ])
  ])
};
