<template>
    <v-layout column>
        <v-layout content-center >
            <div class="formWrapp">
                <panel title="Login">

                <form>
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
                        ></v-text-field>

                   <div class="red tac" v-html="error"/>
                    <v-flex tac>
                        <v-btn
                            @click="login"
                            color="red"
                            >Login</button>
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
    async login () {
      try {
        const response = await AuthenticationService.login({
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
