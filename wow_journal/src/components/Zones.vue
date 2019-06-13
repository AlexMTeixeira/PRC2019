<template>
  <v-container>
    <v-layout>
    <v-flex xs6 ma-2>
        <v-card dark>
          <v-card-title>
            <span class="headline">{{tipo}}</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="spells"
            :search="search"
            :rows-per-page-items="rowPerPage"
          >
            <template v-slot:items="props">
              <td class="text-xs-left" @click="goToSpell(props.item.zone)">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.lname }}</td>
              <td class="text-xs-center">{{ props.item.minLevel }}</td>
              <td class="text-xs-center">{{ props.item.numPlayers }}</td>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
        <v-dialog
          v-model="dialog"
          max-width="300px"
        >
          <v-card dark>
            <v-flex xs12 ma-2>
                <v-card-title primary-title>
                    <v-img
                        v-if="spell.icon!==''"
                        :src="'https://wow.zamimg.com/images/wow/icons/large/'+spell.icon+'.jpg'"
                        height="70px"
                        contain
                        dark
                        flat
                    ></v-img>
                    <v-img
                        v-else
                        src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg"
                        height="70px"
                        contain
                        dark
                        flat
                    ></v-img>
                </v-card-title>
            </v-flex>
            <v-flex xs12 ma-2>
                <v-card-title v-text="spell.name"></v-card-title>
                <v-card-text v-if="spell.description !==''" v-text="spell.description"></v-card-text>
                <v-card-text v-if="spell.castTime !==''" v-text="'Cast Time: '+spell.castTime"></v-card-text>
                <v-card-text v-if="spell.cooldown !==''" v-text="'Cooldown: '+spell.cooldown"></v-card-text>
                <v-card-text v-if="spell.powerCost !==''" v-text="'Cost: '+spell.powerCost"></v-card-text>
                <v-card-text v-if="spell.range !==''" v-text="'Range: '+spell.range"></v-card-text>
                <v-card-text v-if="spell.type !==''" v-text="'Type: '+spell.type"></v-card-text>
            </v-flex>
          </v-card>
        </v-dialog>
      </v-flex>
    <v-flex xs6 ma-2>
        <v-card dark>
          <v-card-title>
            <span class="headline">{{tipo}}</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="spells"
            :search="search"
            :rows-per-page-items="rowPerPage"
          >
            <template v-slot:items="props">
              <td class="text-xs-left" @click="goToSpell(props.item.zone)">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.lname }}</td>
              <td class="text-xs-center">{{ props.item.minLevel }}</td>
              <td class="text-xs-center">{{ props.item.numPlayers }}</td>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
        <v-dialog
          v-model="dialog"
          max-width="300px"
        >
          <v-card dark>
            <v-flex xs12 ma-2>
                <v-card-title primary-title>
                    <v-img
                        v-if="spell.icon!==''"
                        :src="'https://wow.zamimg.com/images/wow/icons/large/'+spell.icon+'.jpg'"
                        height="70px"
                        contain
                        dark
                        flat
                    ></v-img>
                    <v-img
                        v-else
                        src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg"
                        height="70px"
                        contain
                        dark
                        flat
                    ></v-img>
                </v-card-title>
            </v-flex>
            <v-flex xs12 ma-2>
                <v-card-title v-text="spell.name"></v-card-title>
                <v-card-text v-if="spell.description !==''" v-text="spell.description"></v-card-text>
                <v-card-text v-if="spell.castTime !==''" v-text="'Cast Time: '+spell.castTime"></v-card-text>
                <v-card-text v-if="spell.cooldown !==''" v-text="'Cooldown: '+spell.cooldown"></v-card-text>
                <v-card-text v-if="spell.powerCost !==''" v-text="'Cost: '+spell.powerCost"></v-card-text>
                <v-card-text v-if="spell.range !==''" v-text="'Range: '+spell.range"></v-card-text>
                <v-card-text v-if="spell.type !==''" v-text="'Type: '+spell.type"></v-card-text>
            </v-flex>
          </v-card>
        </v-dialog>
      </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

const lhost = 'http://localhost:7865'

export default {
  props: ['tipo'],
  data: () => ({
    dialog: false,
    rowPerPage: [10, 25, 50, { 'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1 }],
    name: '',
    spell: {},
    search: '',
    headers: [
      {
        text: 'Name',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Location',
        sortable: true,
        value: 'lname'
      },
      {
        text: 'Level Required',
        sortable: true,
        value: 'minLevel'
      },
      {
        text: 'Number of Players',
        sortable: false,
        value: 'numPlayers'
      }
    ],
    spells: []
  }),
  watch: {
    'tipo': function () {
      if (this.tipo === 'Raids') { this.loadRaids() } else if (this.tipo === 'Dungeons') { this.loadDungeons() } else this.loadZones()
    }
  },
  mounted: async function () {
    if (this.tipo === 'Raids') { this.loadRaids() } else if (this.tipo === 'Dungeons') { this.loadDungeons() } else this.loadZones()
  },
  methods: {
    loadRaids: async function (id) {
      var response = await axios.get(lhost + '/zones/raids')
      this.spells = JSON.parse(JSON.stringify(response.data))
    },
    loadDungeons: async function (id) {
      var response = await axios.get(lhost + '/zones/dungeons')
      this.spells = JSON.parse(JSON.stringify(response.data))
    },
    loadZones: async function (id) {
      var response = await axios.get(lhost + '/zones/')
      this.spells = JSON.parse(JSON.stringify(response.data))
    },
    goToSpell: function (id) {
      this.loadSpell(id)
      this.dialog = true
    }
  }
}
</script>

<style>

</style>
