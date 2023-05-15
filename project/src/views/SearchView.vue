<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <a href="https://cs.skku.edu/ko/">
          <v-img src="https://cs.skku.edu/img/topLogo_new_ko.png" width="300px"></v-img>
        </a>
      </v-col>
      <v-col cols="8"></v-col>
      <v-col cols="2">
        <a href="https://cs.skku.edu/ko/">
          <v-img src="https://cs.skku.edu/img/sw_convergence.png" width="300px"></v-img>
        </a>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>

    <v-row>
      <h1>&nbsp;&nbsp;학교에서 열리는 다양한 행사에 참여해보세요</h1>
    </v-row>
    
    <v-row>
      <v-col cols="2">
        <v-text-field v-model="searchQuery" label="검색" append-icon="mdi-magnify" outlined></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>

    <v-container fluid>
    <div class="scrollable-container">
      <v-row>
        <v-col cols="3" v-for="item in gridItems" :key="item.id">
          <!-- 각 그리드 아이템의 내용 -->
          <router-link :to="`/search/${item.id}`">  
            <v-card>
              <v-img :src="item.src" class="align-end" height="400px" cover></v-img>
              <v-card-text class="font-weight-bold">
                {{ item.title }}
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </div>
  </v-container>



  </v-container>
</template>

<script>
import mainimg1 from '@/assets/main_1.jpg';

export default {
  data() {
    return {
      gridItems: [
        { id: 1, title: '그리드 아이템 1', src: mainimg1 },
        { id: 2, title: '그리드 아이템 2' },
        { id: 3, title: '그리드 아이템 3' },
        { id: 4, title: '그리드 아이템 4' },
        { id: 5, title: '그리드 아이템 5' },
        { id: 6, title: '그리드 아이템 6' },
        { id: 7, title: '그리드 아이템 7' },
        { id: 8, title: '그리드 아이템 8' },
        { id: 9, title: '그리드 아이템 9' },
        { id: 10, title: '그리드 아이템 10' },
        { id: 11, title: '그리드 아이템 11' },
        { id: 12, title: '그리드 아이템 12' },
        { id: 13, title: '그리드 아이템 13' },
        { id: 14, title: '그리드 아이템 14' },
        { id: 15, title: '그리드 아이템 15' },
        { id: 16, title: '그리드 아이템 16' },
      ],
    };
  },
};

</script>
<style>
.scrollable-container {
  max-height: 1000px;
  overflow-y: auto;
}
</style>