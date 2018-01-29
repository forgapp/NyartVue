export default {
  functional: true,
  render: (h, { props: { address } }) => (
    <article class="media">
      <div class="media-left">
        <span class="icon leftIcon">
          <i class="fa fa-address-book-o" aria-hidden="true"></i>
        </span>
        <div class="heading">({ address.Type })</div>
      </div>
      <div class="media-content">
        <div class="content address">
          <p>{ address.Street }</p>
          <p>{ address.Complement }</p>
          <p>{ address.City } { address.State }</p>
          <p>{ address.Country }</p>
        </div>
      </div>
    </article>
  )
};
