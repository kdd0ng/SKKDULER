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
            {{ result.id }}
          </v-card-title>
          <!-- <v-card-subtitle> Student ID: {{ result.id }} </v-card-subtitle> -->
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
                {{ friend.id }}
              </v-card-title>
              <!-- <v-card-subtitle> Student ID: {{ friend.id }} </v-card-subtitle> -->
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
            <v-btn color="primary" @click="sendFriendRequest">+</v-btn>
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
                  {{ request.id }}
                </v-card-title>
                <!-- <v-card-subtitle>
                  Student ID: {{ request.id }}
                </v-card-subtitle> -->
                <v-card-actions>
                  <v-btn
                    variant="outlined"
                    color="green"
                    @click="approveFriendRequest(i)"
                    >수락</v-btn
                  >
                  <v-btn
                    variant="outlined"
                    color="red"
                    @click="declineFriendRequest(i)"
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
      currentUser: null,
      isFriend: false,
      friends: [],
      // friends: [
      //   { name: "권동욱", id: "123", department: "TEST" },
      //   { name: "금찬후", id: "456", department: "TEST" },
      //   { name: "김원종", id: "789", department: "TEST" },
      //   { name: "신현주", id: "101", department: "TEST" },
      //   { name: "송정현", id: "112", department: "TEST" },
      //   { name: "조민재", id: "131", department: "TEST" },
      // ],
      currentPage: 1,
      friendsPerPage: 6,
      requests: [],
      // requests: [
      //   { name: "홍길동", id: "141", department: "TEST" },
      //   { name: "나성균", id: "151", department: "TEST" },
      //   { name: "너성균", id: "161", department: "TEST" },
      // ],
      currentRequestPage: 1,
      requestsPerPage: 6,
      studentid: null,
    };
  },
  methods: {
    // 친구 목록과 친구 신청 목록을 받아옴
    fetchFriendListAndRequests() {
      const data = {
        id: this.studentid,
      };
      fetch(
        `http://localhost:8000/api/friends/friend_list?id=${this.studentid}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.friends = data.friend_list.map((friend) => {
            return {
              id: friend.id,
            };
          });
          this.requests = data.friend_request.map((request) => {
            return {
              id: request.id,
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 친구 찾기
    findFriend(secondSearchInput) {
      fetch(
        `http://localhost:8000/api/friends/friend_list?id=${secondSearchInput}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.isFriend = data.Exists;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 친구 요청 보내기: + 버튼 눌렀을 때
    sendFriendRequest() {
      //sender = this.studentid
      //receiver = secondSearchInput
      fetch(
        `http://localhost:8000/api/friends/send_request?sender=${this.studentid}&receiver=${this.secondSearchInput}`,
        {
          method: "PUT",
        }
      )
        .then((response) => {
          if (!response.ok) {
            // Check if the status code is 200-299
            return response.json().then((error) => {
              if (error.detail === "Receiver ID does not exist.") {
                // Operation was successful
                console.log("Success: ", error.detail);
              } else {
                // Other errors
                throw new Error(error.detail);
              }
            });
          } else {
            return response.json().then((data) => {
              if (data.message === "Friend request sent.") {
                alert("친구 요청이 보내졌습니다.");
              } else {
                console.log(data.message);
              }
            });
          }
        })
        .catch((error) => {
          // Network errors
          console.error("Network error: ", error);
        });
    },
    //친구 목록에서 찾기

    // 친구 요청 수락 : 수락 버튼 눌렀을 때 API 통신 + UI 변경
    approveFriendRequest(index) {
      this.friends.push(this.paginatedRequests[index]);
      const realIndex =
        (this.currentRequestPage - 1) * this.requestsPerPage + index;
      this.requests.splice(realIndex, 1);

      if (this.currentRequestPage > this.numberOfRequestPages) {
        this.currentRequestPage--;
      }
      fetch(
        `http://localhost:8000/api/friends/accept_request?sender=${this.paginatedRequests[index].id}&receiver=${this.studentid}`,
        {
          method: "PUT",
        }
      ).catch((error) => {
        console.error("Error:", error);
      });
    },
    // 친구 요청 거절 : 거절 버튼 눌렀을 때 API 통신 + UI 변경
    declineFriendRequest(index) {
      const realIndex =
        (this.currentRequestPage - 1) * this.requestsPerPage + index;
      this.requests.splice(realIndex, 1);

      if (this.currentRequestPage > this.numberOfRequestPages) {
        this.currentRequestPage--;
      }

      fetch(
        `http://localhost:8000/api/friends/delete_request?sender=${this.requests[realIndex].id}&receiver=${this.studentid}`,
        {
          method: "PUT",
        }
      ).catch((error) => {
        console.error("Error:", error);
      });
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

    hideSearch(e) {
      if (
        this.$refs.searchBar &&
        !this.$refs.searchBar.$el.contains(e.target)
      ) {
        this.showSearch = false;
      }
    },
    toggleSearch() {
      if (this.showSearch) {
        this.showSearch = false;
      } else {
        this.$nextTick(() => {
          this.showSearch = true;
        });
      }
    },
    toggleOtherSearch() {
      if (this.showOtherSearch) {
        this.showOtherSearch = false;
      } else {
        this.$nextTick(() => {
          this.showOtherSearch = true;
        });
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

  computed: {
    studentId() {
      return this.$store.state.studentId;
    },
    // 검색한 친구가 친구 리스트에 없는 경우 확인
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
            (friend) => friend.id.toLowerCase() === result.id.toLowerCase()
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
    this.studentid = this.$store.state.studentId;
    this.fetchFriendListAndRequests();
  },
};
</script>

<style>
.button-top-margin {
  margin-top: 100px;
}
</style>
