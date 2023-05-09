<template>
  <v-card>
    <v-layout>
      <v-app-bar color="white" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>SKKUDULER</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify" @click="showSearch = !showSearch"></v-btn>
        <v-text-field v-if="showSearch" v-model="search" :label="'Search'" style="padding-top: 10px;"></v-text-field>
        <v-btn vriant="text" icon="mdi-bell"></v-btn>
        <v-btn variant="text" icon="mdi-login" @click="gotologin"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" persistent>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="item.value"
            @click="navigateTo(index)"
            v-bind:class="{ selected: index === selectedIndex }"
          >
            <v-layout>
              <v-flex>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
              </v-flex>

              <v-flex>
                <v-list-item-title class="ml-2">{{ item.title }}</v-list-item-title>
              </v-flex>
            </v-layout>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    group: null,
    selectedIndex: 0,
    items: [
      {
        title: '홈',
        value: 'home',
        icon: 'mdi-home',
      },
      {
        title: '캘린더',
        value: 'calendar',
        icon: 'mdi-calendar-month',
      },
      {
        title: '친구',
        value: 'friend',
        icon: 'mdi-account-group',
      },
      {
        title: '검색하기',
        value: 'search',
        icon: 'mdi-magnify',
      },
      {
        title: '일정주최',
        value: 'host',
        icon: 'mdi-volume-high',
      },
    ],
    showSearch: false,
    search: '',
    studentid: null,
  }),
  created() {
    this.$router.push({ name: 'home' });
  },

  methods: {
    navigateTo(index) {
      this.drawer = true;
      this.selectedIndex = index;
      const item = this.items[index];
      this.$router.push({ name: item.value });
      //console.log("Current route name: ", this.$route.name);
      //console.log("Clicked menu value: ", item.value);
    },
    gotologin(){
      this.$router.push('/login');
    },
  },

  
};
</script>

<style>
.selected {
  color: red;
}
</style>

