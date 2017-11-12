<template>
  <div class="field has-addons">
    <p class="control">
      <span class="select">
        <select>
          <option>My Candidates</option>
          <option>My Clients</option>
          <option>My Jobs</option>
        </select>
      </span>
    </p>
    <p class="control is-expanded">
      <input class="input" type="text" placeholder="Find a post">
    </p>
    <p class="control">
      <button class="button">
        Search
      </button>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'SearchInput'
  };
</script>
