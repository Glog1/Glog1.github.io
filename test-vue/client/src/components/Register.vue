<template>
    <v-layout column>
        <v-layout content-center >
            <div class="formWrapp">
                <panel title="Register">
                    <form
                        name="myform"
                        autocomplete="off"
                        >
                        <v-text-field 
                            class="white--text"
                            name="email"
                            label="Email"
                            v-model="email"
                            type="email" 
                            ></v-text-field>

                        <v-text-field 
                            class="white--text"
                            label="Password"
                            name="password"  
                            v-model="password"
                            type="password" 
                            autocomplete="new-password"
                            ></v-text-field>

                        <div class="red tac" v-html="error"/>
                        <v-flex tac>
                            <v-btn
                                @click="register"
                                color="red"
                                >Register
                            </v-btn>
                        </v-flex>
                    </form>
                
             </panel>
            </div>
        </v-layout>
    </v-layout>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.tac{
text-align: center
}

</style>
