<template>
  <v-app
      dark
      id="app">
        <page-header/>
      <main>
        <v-container>
            <router-view/>
        </v-container>
      </main>
  </v-app>
</template>

<script>

import PageHeader from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>
img,iframe{
max-width: 100%;
}
body *{
outline: none
}
.row-flex {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 0;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -.5rem;
    margin-left: -.5rem;
}
.col{
    box-sizing: border-box;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    padding-right: .5rem;
    padding-left: .5rem;
}
textarea.w100 {
    width: 100%;
    height: auto;
    font-family: monospace;
    min-height: 600px;
}

.h100 {
    height: 100%;
}
main {
    padding-top: 60px;
}
.mb5{
    margin-bottom: .5rem;
}
.mb1{
    margin-bottom: 1rem;
}
.container{
position: relative;
margin: 0 auto
}
.input-group--text-field label {
    text-transform: capitalize;
}
.toolbar a {
    color: #fff;
    text-decoration: none;
}
.content-center{
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    height: 100%;
}
.formWrapp{
width: 600px;
max-width: 95%;
margin: 0 auto
}
.toHome:hover {
    opacity: .9;
    transition: .3s cubic-bezier(.25,.8,.5,1),color 1ms;
}
.tac{
text-align: center
}

</style>
