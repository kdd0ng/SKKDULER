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
        <h1>&nbsp;&nbsp;학과 공지사항</h1>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list>
            <v-list-item v-for="item in paginatedItems" :key="item.id" :href="item.link" target="_blank">
              {{ item.name }}
              <v-divider></v-divider>
            </v-list-item>
            <v-pagination v-model="page" :length="(items.length/perPage)+1" :items-per-page="perPage" @input="onPageChange"></v-pagination>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <h1>&nbsp;&nbsp;학생회 Instagram</h1>
    </v-row>
    <v-row>
      <v-card class="mx-auto" max-width="6000">

        <v-container fluid>
          <v-row dense>
            <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
              <v-card>
                <v-img
                  :src="card.src"
                  class="align-end"
                  height="400px"
                  cover
                >
                  <!-- <v-card-title class="text-black align-self-start" style="font-weight: bold">{{ card.title }}</v-card-title> -->
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>
                  <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>
                  <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>

  </v-container>
</template>

<script>
import mainimg1 from '@/assets/main_1.jpg';
import mainimg2 from '@/assets/main_2.jpg';
import mainimg3 from '@/assets/main_3.jpg';
import mainimg4 from '@/assets/main_4.jpg';
import mainimg5 from '@/assets/main_5.jpg';
import mainimg6 from '@/assets/main_6.jpg';
import mainimg7 from '@/assets/main_7.jpg';
import mainimg8 from '@/assets/main_8.jpg';
import mainimg9 from '@/assets/main_9.jpg';

  export default {
    data: () => ({
      page: 1,
      perPage: 4,
      items: [
        {
          name: '[대학원] 2023-1 논문제출자격시험 / 학위논문심사 접수 기간 추가 운영 안내(~5.4 12:00)',
          id: 1,
          link: 'https://cs.skku.edu/ko/news/notice/view/7171' // 링크 주소 지정
        },
        {
          name: '2023년 성균SW멘토링 프로그램 배정 최종 명단 안내',
          id: 2,
          link: 'https://cs.skku.edu/ko/news/notice/view/7170'
        },
        {
          name: '2023학년도 1학기 연구논문작품 지도교수 배정 결과 안내',
          id: 3,
          link: 'https://cs.skku.edu/ko/news/notice/view/7168'
        },
        {
          name: '[대학원] 2023년도 전기 자연계대학원 박사학위과정 전문연구요원 편입대상자 선발 공고 안내',
          id: 4,
          link: 'https://cs.skku.edu/ko/news/notice/view/7167'
        },
        {
          name: '[학부] 2023년 KAIST 몰입캠프 여름학기 모집',
          id: 5,
          link: 'https://cs.skku.edu/ko/news/notice/view/7163'
        },
        {
          name: '[학부] 2023학년도 1학기 교수님들과의 만남 개최',
          id: 6,
          link: 'https://cs.skku.edu/ko/news/notice/view/7147'
        },
        {
          name: '[학부] 2023학년도 1학기 교수님들과의 만남 개최',
          id: 7,
          link: 'https://cs.skku.edu/ko/news/notice/view/7147'
        },
        {
          name: '[학부] 2023학년도 1학기 교수님들과의 만남 개최',
          id: 8,
          link: 'https://cs.skku.edu/ko/news/notice/view/7147'
        },
        {
          name: '[학부] 2023학년도 1학기 교수님들과의 만남 개최',
          id: 9,
          link: 'https://cs.skku.edu/ko/news/notice/view/7147'
        },
        {
          name: '[학부] 2023학년도 1학기 교수님들과의 만남 개최',
          id: 10,
          link: 'https://cs.skku.edu/ko/news/notice/view/7147'
        },
        {
          name: '[학부] 2023학년도 1학기 교수님들과의 만남 개최',
          id: 11,
          link: 'https://cs.skku.edu/ko/news/notice/view/7147'
        },
      ],
      cards: [
        { title: '중간고사 간식배부', src: mainimg1, flex: 3 },
        { title: '오피스 아워 휴무', src: mainimg2, flex: 3 },
        { title: '스터디 그룹 모집', src: mainimg3, flex: 3 },
        { title: '학습 공간 안내', src: mainimg4, flex: 3 },
        { title: '교수님과의 만남', src: mainimg5, flex: 3 },
        { title: '5월 일정', src: mainimg6, flex: 3 },
        { title: '성균제 부스 안내', src: mainimg7, flex: 3 },
        { title: 'E-sports 대회', src: mainimg8, flex: 3 },
      ],
    }),
    computed: {
      paginatedItems() {
        const start = (this.page - 1) * this.perPage;
        const end = start + this.perPage;
        return this.items.slice(start, end);
      }
    },
    methods: {
      onPageChange(page) {
        this.page = page;
      }
    }
  }
</script>