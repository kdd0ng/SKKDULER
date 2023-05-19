<template>
  <div class="pa-5">
      <v-row>
          <v-col cols="12" md="6" class="mb-4">
              <v-row>
                  <v-col cols="6">
                      <v-menu
                              ref="dateOpen"
                              v-model="dateOpen"
                              :close-on-content-click="false"
                              :return-value.sync="start"
                              offset-y
                      >
                          <template v-slot:activator="{ on }">
                              <v-text-field
                                      v-model="start"
                                      label="Start Date"
                                      prepend-icon="mdi-calendar"
                                      dense
                                      readonly
                                      outlined
                                      hide-details
                                      v-on="on"
                              ></v-text-field>
                          </template>
  
                          <v-date-picker v-model="start"
                                         no-title
                          >
                              <v-spacer/>
                              <v-btn text color="primary" @click="dateOpen = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="$refs.dateOpen.save(start)">OK</v-btn>
                          </v-date-picker>
                      </v-menu>
                  </v-col>
                  <v-col cols="6">
                      <v-select
                              v-model="type"
                              :items="typeOptions"
                              label="Type"
                              class="my-auto"
                              hide-details
                              outlined
                              dense
                      ></v-select>
                  </v-col>
              </v-row>
              <v-sheet height="500">
                  <v-calendar
                    :event-color="getEventColor"
                    :events="events"
                    :start="start"
                    :type="type"
                    @click:date="open"
                    @click:event="showEvent"
                    @click:more="moreEvent"
                    @click:time="open"
                    dark
                    ref="calendar"

                    v-model="start"
                  ></v-calendar>
              </v-sheet>
          </v-col>
      </v-row>
  </div>
</template>
  
<script>
  export default {
      data() {
          return {
              dateOpen: false,
              start: '',
              type: 'month',
              typeOptions: [
                  {text: 'Day', value: 'day'},
                  {text: 'Week', value: 'week'},
                  {text: 'Month', value: 'month'},
              ],
          }
      },
      methods: {
          open(date) {
              this.$store.commit('OPEN_CALENDAR_DIALOG', date)
          }
      }
  }

  const mutations = {
      OPEN_CALENDAR_DIALOG(state, payload) {
          state.calendar.startDate = payload.date;
          state.calendar.startTime = payload.time;
          state.calendar.hasTime = payload.hasTime;
          state.dialog = true;
      }
  };
  </script>