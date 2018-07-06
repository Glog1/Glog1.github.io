<template>
   <panel title="Tab" v-if="song.tab">
                    <textarea
                    readonly
                    v-model="song.tab"
                     class="w100">
                    </textarea>
    </panel>
</template>

<script>
export default{
  props: [
    'song'
  ]
}
</script>
<style scoped>

</style>
