<template>
  <div></div>
</template>

<script>
export default {
  name: "ParameterManagement",
  components: {},
  data() {
    return {
      query: {
        application: '',
        active: '',
        key: ''
      }
    }
  },
  methods: {
    listParameter() {
      this.$api.prophetParameter.listParameter(this.query).then(data => {
        console.log(data);
      })
    }
  },
  created() {
    this.listParameter();
  }
}
</script>

<style scoped>
</style>
