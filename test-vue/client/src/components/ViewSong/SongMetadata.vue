<template>
    <div>
        <div v-if="song.albumImageUrl" class="tac"><img :src="song.albumImageUrl" :alt="song.album" /></div>
        <div v-if="song.artist">Artist: {{song.artist}}</div>
        <div v-if="song.album">Album: {{song.album}}</div>
        <div v-if="song.genre">Genre: {{song.genre}}</div>
         <v-btn
           v-if="isUserLoggedIn"
          :to="{
            name: 'song-edit', 
            params () {
              return {
                songId: song.id
              }
            }
          }">
          Edit
        </v-btn>
         <v-btn
          v-if="isUserLoggedIn && !bookmark"
           @click="setAsBookmark">
          Set As Bookmark
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && bookmark"
         @click="unsetAsBookmark">
          Unset As Bookmark
        </v-btn>
     </div>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      return
    }
    try {
      const bookmarks = (await BookmarksService.index({
        songId: this.song.id,
        userId: this.user.id
      })).data
      if (bookmarks.length) {
        this.bookmark = bookmarks[0]
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id,
          userId: this.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
</style>
