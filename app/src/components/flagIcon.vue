<script>
  import Flag from './flag';

  function flagWithIcon(flagComponent) {
    return {
      functional: true,
      render(h, { props: { country } }) {
        if (!country) {
          return null;
        }

        return (<small>
          <span class="icon">
            <Flag country={ country } />
          </span>
        </small>);
      }
    };
  }

  export default flagWithIcon(Flag);
</script>