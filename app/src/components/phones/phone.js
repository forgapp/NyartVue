export default {
  functional: true,
  render: (h, { props: { phone } }) => {
    const phoneUrl = `tel:${phone.Number}`;

    return (<div class="phoneElement">
      <div>
        <span class="icon leftIcon">
          <i class="fa fa-phone" aria-hidden="true"></i>
        </span>
        <a href={ phoneUrl }>{ phone.Number }</a>
      </div>
      { phone.Type && <div class="heading">({ phone.Type })</div> }
    </div>);
  }
};
