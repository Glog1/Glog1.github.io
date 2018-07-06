<template>
    <panel :title="song.title">
        <v-layout>
            <v-flex class="h100 xs4">
                <song-metadata :song="song" />
            </v-flex>
            <v-flex xs8>
                <youtube :youtubeId="song.youtubeId"/>
            </v-flex>
         </v-layout>
         <v-layout>
            <v-flex xs4 mr-2>
                 <lyrics :song="song"/>
            </v-flex>
            <v-flex xs8>
                <tab :song="song"/>
            </v-flex>
        </v-layout>
    </panel>
</template>
<script>
import SongsService from '@/services/SongsService'
import SongHistoryService from '@/services/SongHistoryService'
import SongMetadata from './SongMetadata'
import lyrics from './lyrics'
import tab from './tab'
import youtube from './youtube'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      song: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    const songId = this.route.params.songId
    this.song = (await SongsService.show(songId)).data
    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: songId,
        userId: this.user.id
      })
    }
  },
  components: {
    SongMetadata,
    lyrics,
    tab,
    youtube
  }
}
</script>
<style scoped>

</style>
