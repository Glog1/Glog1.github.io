<template>
<v-layout row-flex>
    <div class="flex xs4 col song" v-for="song in songs"
         :key="song.id">
        <panel :title="song.title"
            class="h100">
            <div>
                <div v-if="song.albumImageUrl" class="tac"><img :src="song.albumImageUrl" :alt="song.album" /></div>
                <div v-if="song.artist">Artist: {{song.artist}}</div>
                <div v-if="song.album">Album: {{song.album}}</div>
                <div v-if="song.genre">Genre: {{song.genre}}</div>
                <v-btn
                    slot="action"
                    :to="{name: 'song', params: {songId: song.id}}"
                    >
                    View
                </v-btn>
            </div>
        </panel>
    </div>
</v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      songs: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
.song{
padding-bottom: .5rem;
padding-top: .5rem;

}
</style>
