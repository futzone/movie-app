<template>
  <input type="text" class="form-control search-input" placeholder="Kinolarni qidirish" @input="onChangeValue"
    :value="term">
</template>
<script>
export default {
  props: {
    onUpdateTerm: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      term: ''
    }
  },
  methods: {
    onChangeValue(e) {
      this.term = e.target.value
      this.onUpdateTerm(this.term)
    }
  },
}
</script>

<style scoped>
.search-input {
  margin-bottom: 1.5rem;
  /* margin-top: 2rem; */
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, .15);
}
</style>