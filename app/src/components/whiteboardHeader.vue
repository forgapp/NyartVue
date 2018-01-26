<template>
  <h3 v-if="!isFilterOpened" class="title is-4">
    Whiteboard for {{ recruiter.Name }} <small><a class=" is-size-6 has-text-info is-underline" @click.prevent="toggleFilter">(Change)</a></small>
  </h3>
  <div v-else>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Whiteboard for</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <recruiter-lookup
              :value="recruiter"
              @input="recruiterChanged"
            />
          </p>
        </div>

        <div class="field">
          <div class="buttons">
            <button class="button" @click.prevent="refresh">
              <span class="icon">
                <i class="fa fa-refresh"></i>
              </span>
            </button>
            <button class="button is-text" @click.prevent="toggleFilter">
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({})
  class WhiteboardHeader extends Vue {
    @Prop({}) recruiter
    isFilterOpened = false;

    toggleFilter() {
      this.isFilterOpened = !this.isFilterOpened;
    }

    @Emit()
    recruiterChanged(recruiter) {}

    @Emit()
    refresh() {
      this.toggleFilter();
    }
  }

  export default WhiteboardHeader;
</script>
