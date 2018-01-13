<template>
  <div>
    <div class="container">
  		<div class="notification is-danger">
  			You are not allowed here.
  		</div>
  	</div>
  	<div class="container is-fluid">
    	<div class="columns">
    	  <div class="column is-3">
    	    <aside class="menu">
            <p class="menu-label">
              General
            </p>
            <ul class="menu-list">
              <li><router-link to="/admin/users" activeClass="is-active">Users</router-link></li>
            </ul>
            <p class="menu-label">Manage Picklists Values</p>
            <ul class="menu-list">
              <li><router-link to="/admin/picklists" activeClass="is-active">Picklists</router-link></li>
              <li><router-link to="/admin/codes?type=Industry" activeClass="is-active" exact>Industries</router-link></li>
              <li><router-link to="/admin/codes?type=JobFunction" activeClass="is-active" exact>Job Function</router-link></li>
            </ul>
          </aside>
        </div>
        <div class="column">
          <router-view></router-view>
        </div>
    	</div>
    </div>
	</div>
</template>


<script>
  export default {
    name: 'Admin'
  };
</script>
