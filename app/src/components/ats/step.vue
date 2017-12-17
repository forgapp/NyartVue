<script>
  export default {
    name: 'step',
    functional: true,
    render: (h, { props, children }) => {
      const { step, isRejected } = props;
      const stepClass = {
        column: true,
        'has-text-centered': true,
        step: true,
        success: step && !isRejected,
        rejected: step && isRejected
      };

      return h('div', { class: stepClass }, [
        children,
        h('p', { class: [ 'heading' ] }, step && step.StageDate)
      ]);
    }
  };
</script>
