export default {
  functional: true,
  render: (h, { props: { email } }) => {
    const mailto = `mailto:${email.Address}`;

    return (<div class="emailElement">
      <div>
        <span class="icon leftIcon">
          <i class="fa fa-at" aria-hidden="true"></i>
        </span>
        <a href={ mailto }>{ email.Address }</a>
      </div>
      { email.Type && <div class="heading">({ email.Type })</div> }
    </div>);
  }
};
