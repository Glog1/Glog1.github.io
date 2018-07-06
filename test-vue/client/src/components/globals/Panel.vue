<template>
  <div class="grey darken-3">
                <v-toolbar flat dense class="red">
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                </v-toolbar>

                <div class="pl-4 pr-4 pt-4 pb-4">
                    <slot title="Songs">
                        No slot content defined.
                    </slot>
                </div>
    </div>

</template>

<script>
export default{
  props: [
    'title'
  ]
}
</script>

<style scoped>
.toolbar__title {
    text-transform: capitalize;
}
</style>
