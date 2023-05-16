<template>
  <v-container>
    <v-toolbar dense flat color="green">
      <v-toolbar-title class="white--text">Friend List</v-toolbar-title>
      <v-btn variant="text" icon="mdi-magnify" @click="toggleSearch"></v-btn>
      <v-text-field
        v-if="showSearch"
        v-model="search"
        class="mr-4"
        label="찾고 싶은 친구의 이름을 입력하세요"
        single-line
        hide-details
        ref="searchBar"
      ></v-text-field>
    </v-toolbar>
    <v-row class="mt-5" v-if="search && searchResults.length">
      <v-col v-for="(result, i) in searchResults" :key="i" cols="4">
        <v-card>
          <v-card-title>
            {{ result.name }}
          </v-card-title>
          <v-card-subtitle> Student ID: {{ result.id }} </v-card-subtitle>
          <v-card-text> Department: {{ result.department }} </v-card-text>
        </v-card>
        <!-- 친구 리스트에 없는 친구라면 추가하기 버튼 띄우기 -->
        <!-- 추가하기 버튼을 누르면 친구 신청 -->
      </v-col>
    </v-row>

    <v-row v-else class="my-2">
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
                  >수락</v-btn
                >
                <v-btn variant="outlined" color="red" @click="declineRequest(i)"
                  >거절</v-btn
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
      search: "",
      showSearch: false,
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

      studentid: null,
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

    highlight(text) {
      const highlightText = `<span class="highlight">${this.search}</span>`;
      const regex = new RegExp(this.search, "gi");
      return text.replace(regex, highlightText);
    },
    hideSearch(e) {
      if (!this.$refs.searchBar.$el.contains(e.target)) {
        this.showSearch = false;
      }
    },
    toggleSearch() {
      if (this.showSearch) {
        this.showSearch = false;
      } else {
        setTimeout(() => {
          this.showSearch = true;
        }, 0);
      }
    },
  },
  computed: {
    searchResults() {
      if (!this.search) {
        return [];
      }
      return this.friends.filter((friend) =>
        friend.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredFriends() {
      return this.friends.filter((friend) =>
        friend.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
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
  mounted() {
    document.addEventListener("click", this.hideSearch);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSearch);
  },
};
</script>

<style>
.button-top-margin {
  margin-top: 100px;
}
.highlight {
  background-color: greenyellow;
  padding: 2px;
}
</style>
