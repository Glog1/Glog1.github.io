<template>
    <v-toolbar fixed class="red">
        <v-toolbar-title class="mr-4">
            <router-link to="/" class="toHome">Single Page Application</router-link>
        </v-toolbar-title>
        <v-toolbar-items>
            <v-btn
                flat
                :to="{name: 'songs'}"
                >
                Browse
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                flat
                :to="{name: 'register'}"
                >
                Sign Up
            </v-btn>
            <v-btn 
                v-if="!$store.state.isUserLoggedIn"
                flat
                :to="{name: 'login'}"
                >
                Login
            </v-btn>
            <v-btn 
                v-if="$store.state.isUserLoggedIn"
                flat 
                dark
                @click="logout">
                Log Out
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>
<style scoped>
</style>