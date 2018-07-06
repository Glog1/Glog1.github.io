<template>
<panel title="search" class="mb5">
     <v-text-field 
    class="white--text"
    label="Search"
    name="search"  
    v-model="search"
    type="text" 
    ></v-text-field>
</panel>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>
<style scoped>

</style>