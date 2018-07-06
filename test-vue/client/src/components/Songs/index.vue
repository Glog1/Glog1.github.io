<template>
    <div>
        <v-layout column>
            <v-flex v-if="isUserLoggedIn">
                <songs-bookmarks/>
                <recently-viewed-songs />
            </v-flex>
            <v-flex>
                <songs-search-panel/>
            </v-flex>
        </v-layout>
        <v-layout column>
            <v-btn
                    fab
                    absolute
                    right
                    class="red"
                    slot="action"
                    :to="{name: 'create-songs'}"
            >
                <v-icon> add</v-icon>
            </v-btn>
            <songs-panel/>
        </v-layout>
    </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongsBookmarks from './SongsBookmarks'
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import {mapState} from 'vuex'
export default{
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  }
}
</script>

<style scoped>

</style>
