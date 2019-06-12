<template>
  <v-container>
    <v-card dark>
        <v-layout>
            <v-flex xs2>
                <v-img
                :src="require('../assets/'+faction+'-symbol.png')"
                height="125px"
                contain
                ></v-img>
            </v-flex>
            <v-flex xs10>
                <v-card-title primary-title>
                <div>
                    <div class="headline">{{name}}</div>
                    <div>{{description}}</div>
                </div>
                </v-card-title>
            </v-flex>
        </v-layout>
    </v-card>
    <v-divider light></v-divider>
    <v-expansion-panel>
        <v-expansion-panel-content lazy class="grey darken-4">
            <template v-slot:actions>
                <v-icon color="primary">$vuetify.icons.expand</v-icon>
            </template>
            <template v-slot:header>
                <div class="headline white--text">Races</div>
            </template>
            <v-card dark>
                <v-flex>
                    <v-list two-line dark>
                        <v-list-tile
                            v-for="(item, index) in races"
                            :key="index"
                            @click="goToRaces(item.race)"
                        >
                            <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/medium/race_'+item.name.replace(/ |'/g,'').toLowerCase().replace('undead','scourge')+'_male.jpg'" ></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-flex>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
  import axios from "axios"

  const lhost = "http://localhost:7865"

  export default {
    props: ['faction'],
    data: () => ({
        description: "",
        name: "",
        races: []
    }),
    watch: {
        'faction': function () {
            this.loadFaction(this.faction)
            this.loadRaces(this.faction)
        }
    },
    mounted: async function() {
        this.loadFaction(this.faction)
        this.loadRaces(this.faction)
    },
    methods: {
        loadFaction: async function(id) {
            var response = await axios.get(lhost+"/factions/"+id)
            this.name = response.data[0].name
            this.description = response.data[0].description
        },
        loadRaces: async function(id) {
            var response = await axios.get(lhost+"/factions/"+id+"/races")
            this.races = JSON.parse(JSON.stringify(response.data))
        },
        goToRaces: function(id) {
            this.$router.push('/races/'+id)
        }
    }
  }
</script>

<style>

</style>
