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
        </v-card>
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
      <v-btn
        variant="text"
        icon="mdi-magnify"
        @click="toggleOtherSearch"
      ></v-btn>
      <v-text-field
        v-if="showOtherSearch"
        v-model="secondSearchInput"
        class="mr-4"
        label="찾고 싶은 친구의 학번을 입력하세요"
        single-line
        hide-details
        ref="otherSearchBar"
      ></v-text-field>
    </v-toolbar>

    <v-row class="mt-5" v-if="secondSearchInput && !isFriend">
      <v-col cols="4">
        <v-card>
          <v-card-title>{{ secondSearchInput }}</v-card-title>
          <v-card-subtitle
            >친구요청을 보내려면 아래 버튼을 클릭하세요.</v-card-subtitle
          >
          <v-card-actions>
            <v-btn color="primary" @click="addFriend">+</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="my-2" v-else
      ><v-row class="my-2">
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
                <v-card-subtitle>
                  Student ID: {{ request.id }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    variant="outlined"
                    color="green"
                    @click="approveRequest(i)"
                    >수락</v-btn
                  >
                  <v-btn
                    variant="outlined"
                    color="red"
                    @click="declineRequest(i)"
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
    </v-row>
    <!-- <v-btn color="white" @click="searchNonFriend">Search</v-btn> -->

    <!-- 친구 리스트에 없는 친구라면 추가하기 버튼 띄우기 -->
    <!-- 추가하기 버튼을 누르면 친구 신청 -->
    <!-- <v-row class="mt-5" v-if="otherSearch && searchResults.length">
      <v-col v-for="(result, i) in searchResults" :key="i" cols="4">
        <v-card>
          <v-card-title>
            {{ result.name }}
          </v-card-title>
          <v-card-subtitle> Not Yet a Friend </v-card-subtitle>
          <v-card-actions>
            <v-btn variant="outlined" color="blue" @click="addFriend(result)">
              <v-icon>mdi-plus</v-icon>
              Add Friend
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      showSearch: false,
      showOtherSearch: false,
      secondSearchInput: null,

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
    // 현재 로그인한 사용자 id 받음
    fetchCurrentUser() {
      this.$root.$on("login-success", (studentid) => {
        this.studentid = studentid;
        this.fetchFriends();
      });
    },
    // 현재 로그인한 사용자의 친구 목록 받음
    fetchFriends() {
      if (!this.studentid) {
        return;
      }

      fetch(
        `http://localhost:8000/api/friends/friend_list?id=${this.studentid}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.friends = data;
            console.log(this.studentid);
          }
        })
        .catch((err) => console.error(err));
    },

    showFriendList() {
      this.fetchCurrentUser();
    },

    searchNonFriend() {
      if (!this.otherSearch) {
        return;
      }

      fetch(
        `http://localhost:8000/api/friends/friend_list?id=${this.studentid}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.friends = data;
            const nonFriend = this.friends.find(
              (friend) => friend.name === this.otherSearch
            );

            if (!nonFriend) {
              const newFriend = {
                name: this.otherSearch,
                id: null,
              };
              this.searchResults.push(newFriend);
            }
          }
        })
        .catch((err) => console.error(err));
    },
    isFriend(result) {
      return this.friends.some(
        (friend) => friend.name.toLowerCase() === result.name.toLowerCase()
      );
    },
    addFriend() {
      this.friends.push(this.secondSearchInput);
    },
    // addFriend(result) {
    //   this.friends.push(result);
    //   const index = this.searchResults.findIndex(
    //     (item) => item.name.toLowerCase() === result.name.toLowerCase()
    //   );
    //   if (index !== -1) {
    //     this.searchResults.splice(index, 1);
    //   }
    // },
    addFriendRequest(result) {
      console.log(result.name);
    },

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
    toggleOtherSearch() {
      if (this.showOtherSearch) {
        this.showOtherSearch = false;
      } else {
        setTimeout(() => {
          this.showOtherSearch = true;
        }, 0);
      }
    },
    filteredSearchResults() {
      if (!this.search) {
        return [];
      }
      return this.searchResults.filter((result) =>
        result.id.includes(this.search.toLowerCase())
      );
    },
  },
  watch: {
    studentid(newStudentId) {
      this.fetchFriends();
    },
  },

  computed: {
    isFriend() {
      return this.friends.includes(this.secondSearchInput);
    },
    searchResults() {
      if (!this.otherSearch) {
        return [];
      }
      return this.searchResults.filter(
        (result) =>
          !this.friends.some(
            //name -> id로 변경
            (friend) => friend.name.toLowerCase() === result.name.toLowerCase()
          )
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
  created() {
    this.fetchFriends();
  },
};
</script>

<style>
.button-top-margin {
  margin-top: 100px;
}
</style>
