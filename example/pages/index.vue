<template>
  <div>
    token: {{ token }}
  </div>
</template>

<script>
export default {
  computed: {
    token () { return this.$store.state.csrf.token }
  }
}
</script>
