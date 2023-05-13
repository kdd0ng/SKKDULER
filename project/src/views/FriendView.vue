<template>
  <v-container>
    <v-app-bar color="green" dark>
      <v-toolbar-title>Friends List</v-toolbar-title>
    </v-app-bar>

    <v-row class="my-2">
      <v-col cols="1" class="text-left button-top-margin">
        <v-btn icon @click="prevPage" :disabled="currentPage === 1">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col v-for="(friend, i) in paginatedFriends" :key="i" cols="4">
            <v-card>
              <v-card-title>
                {{ friend.name }}
              </v-card-title>
              <v-card-subtitle> Student ID: {{ friend.id }} </v-card-subtitle>
              <v-card-text> Department: {{ friend.department }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" class="text-right button-top-margin">
        <v-btn icon @click="nextPage" :disabled="currentPage === numberOfPages">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <v-toolbar dense flat color="green">
      <v-toolbar-title class="white--text">Friend Requests</v-toolbar-title>
    </v-toolbar>

    <v-row class="my-2">
      <v-col cols="1" class="text-left button-top-margin">
        <v-btn
          icon
          @click="prevRequestPage"
          :disabled="currentRequestPage === 1"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col v-for="(request, i) in paginatedRequests" :key="i" cols="4">
            <v-card>
              <v-card-title>
                {{ request.name }}
              </v-card-title>
              <v-card-subtitle> Student ID: {{ request.id }} </v-card-subtitle>
              <v-card-text> Department: {{ request.department }} </v-card-text>
              <v-card-actions>
                <v-btn
                  variant="outlined"
                  color="green"
                  @click="approveRequest(i)"
                  >Approve</v-btn
                >
                <v-btn variant="outlined" color="red" @click="declineRequest(i)"
                  >Decline</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" class="text-right button-top-margin">
        <v-btn
          icon
          @click="nextRequestPage"
          :disabled="currentRequestPage === numberOfRequestPages"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        { name: "권동욱", id: "123", department: "TEST" },
        { name: "금찬후", id: "456", department: "TEST" },
        { name: "김원종", id: "789", department: "TEST" },
        { name: "신현주", id: "101", department: "TEST" },
        { name: "송정현", id: "112", department: "TEST" },
        { name: "조민재", id: "131", department: "TEST" },
      ],
      currentPage: 1,
      friendsPerPage: 6,

      requests: [
        { name: "홍길동", id: "141", department: "TEST" },
        { name: "나성균", id: "151", department: "TEST" },
        { name: "너성균", id: "161", department: "TEST" },
      ],
      currentRequestPage: 1,
      requestsPerPage: 6,
    };
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.numberOfPages) this.currentPage++;
    },

    prevRequestPage() {
      if (this.currentRequestPage > 1) this.currentRequestPage--;
    },
    nextRequestPage() {
      if (this.currentRequestPage < this.numberOfRequestPages)
        this.currentRequestPage++;
    },

    approveRequest(index) {
      this.friends.push(this.paginatedRequests[index]);
      const realIndex =
        (this.currentRequestPage - 1) * this.requestsPerPage + index;
      this.requests.splice(realIndex, 1);

      if (this.currentRequestPage > this.numberOfRequestPages) {
        this.currentRequestPage--;
      }
    },

    declineRequest(index) {
      const realIndex =
        (this.currentRequestPage - 1) * this.requestsPerPage + index;
      this.requests.splice(realIndex, 1);

      if (this.currentRequestPage > this.numberOfRequestPages) {
        this.currentRequestPage--;
      }
    },
  },
  computed: {
    paginatedFriends() {
      const start = (this.currentPage - 1) * this.friendsPerPage;
      const end = start + this.friendsPerPage;
      return this.friends.slice(start, end);
    },
    numberOfPages() {
      return Math.ceil(this.friends.length / this.friendsPerPage);
    },
    paginatedRequests() {
      const start = (this.currentRequestPage - 1) * this.requestsPerPage;
      const end = start + this.requestsPerPage;
      return this.requests.slice(start, end);
    },
    numberOfRequestPages() {
      return Math.ceil(this.requests.length / this.requestsPerPage);
    },
  },
};
</script>

<style scoped>
.button-top-margin {
  margin-top: 100px;
}
</style>
