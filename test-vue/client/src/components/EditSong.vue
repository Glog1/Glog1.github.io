<template>
    <div>
        <v-layout> 
            <v-flex xs4 mr-2 ml-2>
                <panel title="Song Metadata">
                    <v-text-field
                        required
                        :rules="[required]"
                        label="title"
                        v-model="song.title"
                        class="white--text">
                </v-text-field>
                <v-text-field
                    required
                    :rules="[required]"
                    label="artist"
                    v-model="song.artist"
                    class="white--text">
            </v-text-field>
            <v-text-field
                required
                :rules="[required]"
                label="genre"
                v-model="song.genre"
                class="white--text">
        </v-text-field>
        <v-text-field
            required
            :rules="[required]"
            label="album"
            v-model="song.album"
            class="white--text">
    </v-text-field>
    <v-text-field
        required
        :rules="[required]"
        label="album Image Url"
        v-model="song.albumImageUrl"
        class="white--text">
</v-text-field>
<v-text-field
    required
    :rules="[required]"
    label="youtube ID"
    v-model="song.youtubeId"
    class="white--text">
</v-text-field>
</panel>
</v-flex>
<v-flex xs8 tac mr-2 ml-2>
    <panel title="Song Structure">
        <v-text-field
            required
            :rules="[required]"
            multi-line
            label="tab"
            v-model="song.tab"
            class="white--text">
    </v-text-field>
    <v-text-field
        required
        :rules="[required]"
        multi-line
        label="lyrics"
        v-model="song.lyrics"
        class="white--text">
</v-text-field>
</panel>
<div>
<span class="error" v-if="error"> 
{{error}} 
</span>
</div>
<v-btn
    @click="save"
    color="red"
    >Save song
</v-btn>
</v-flex>
</v-layout>
</div>
</template>
<script>
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      const songId = this.$store.state.route.params.songId
      try {
        await SongsService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
<style scoped>

</style>