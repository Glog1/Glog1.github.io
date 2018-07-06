<template>
    <panel title="lyrics" v-if="song.lyrics">
          <textarea
        readonly
        v-model="song.lyrics"
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
