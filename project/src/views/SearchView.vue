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
          <router-link :to="`/search/id=${item.id}`">  
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
import searchimg1 from '@/assets/1.png';
import searchimg2 from '@/assets/2.png';
import searchimg3 from '@/assets/3.png';
import searchimg4 from '@/assets/4.png';
import searchimg5 from '@/assets/5.png';
import searchimg6 from '@/assets/6.png';
import searchimg7 from '@/assets/7.png';
import searchimg8 from '@/assets/8.png';
import searchimg9 from '@/assets/9.jpg';
import searchimg10 from '@/assets/10.png';
import searchimg11 from '@/assets/11.png';
import searchimg12 from '@/assets/12.png';
import searchimg13 from '@/assets/13.png';
import searchimg14 from '@/assets/14.png';
import searchimg15 from '@/assets/15.png';
import searchimg16 from '@/assets/16.png';
import searchimg17 from '@/assets/17.png';
import searchimg18 from '@/assets/18.png';
import searchimg19 from '@/assets/19.png';
import searchimg20 from '@/assets/20.png';
import searchimg21 from '@/assets/21.png';
import searchimg22 from '@/assets/22.png';
import searchimg23 from '@/assets/23.png';
import searchimg24 from '@/assets/24.png';
import searchimg25 from '@/assets/25.png';
import searchimg26 from '@/assets/26.png';
import searchimg27 from '@/assets/27.png';
import searchimg28 from '@/assets/28.png';
import searchimg29 from '@/assets/29.png';
import searchimg30 from '@/assets/30.png';
import searchimg31 from '@/assets/31.png';
import searchimg32 from '@/assets/32.png';
import searchimg33 from '@/assets/33.png';
import searchimg34 from '@/assets/34.png';
import searchimg35 from '@/assets/35.png';
import searchimg36 from '@/assets/36.png';
import searchimg37 from '@/assets/37.png';
import searchimg38 from '@/assets/38.png';
import searchimg39 from '@/assets/39.png';
import searchimg40 from '@/assets/40.png';
import searchimg41 from '@/assets/41.png';
import searchimg42 from '@/assets/42.png';
import searchimg43 from '@/assets/43.png';
import searchimg44 from '@/assets/44.png';
import searchimg45 from '@/assets/45.png';
import searchimg46 from '@/assets/46.png';
import searchimg47 from '@/assets/47.png';
import searchimg48 from '@/assets/48.png';
import searchimg49 from '@/assets/49.png';
import searchimg50 from '@/assets/50.png';

export default {
  data() {
    return {
      gridItems: [
        
      ],
    };
  },
  created(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      const ids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]; // 여러 개의 id 값이 있다고 가정

      Promise.all(
        ids.map((id) => {
          return fetch(`http://localhost:8000/api/search/id=${id}`)
            .then((response) => response.json())
            .then((data) => {
              return {
                id: data.id,
                title: data.title,
                src: eval(`searchimg${id}`),
              };
            });
        })
      )
        .then((items) => {
          this.gridItems = items;
        })
        .catch((error) => {
          console.error(error);
        });
        
    }
  }
};

</script>
<style>
.scrollable-container {
  max-height: 1000px;
  overflow-y: auto;
}
</style>