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
        <h1>&nbsp;&nbsp;학우들이 주최한 일정 살펴보기</h1>
    </v-row>
    <v-row>
        <h1>&nbsp;&nbsp;</h1>
    </v-row>
<!--
  <v-row><h10>{{ request_URL }}</h10></v-row>
  <v-row><h10>{{ request_URL2 }}</h10></v-row>
  <h1>{{ deliver }}</h1>
-->
<v-card
    class="mx-auto"
    max-width="750"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-h7 mb-1">
          {{ listItems.title }}
        </div>
        <v-divider></v-divider>
        <div class="text-h6 mb-1">
          <v-icon icon="mdi-calendar-month"></v-icon> 날짜 및 시간
        </div>
        <div class="text-caption" v-if="listItems.start_date">{{ listItems.start_date.substr(0,4) }}년 {{ listItems.start_date.substr(5,2) }}월 {{ listItems.start_date.substr(8,2) }}일 {{ listItems.start_date.substr(11,2) }}시 {{ listItems.start_date.substr(14,2) }}분 - {{ listItems.end_date.substr(0,4) }}년 {{ listItems.end_date.substr(5,2) }}월 {{ listItems.end_date.substr(8,2) }}일 {{ listItems.end_date.substr(11,2) }}시 {{ listItems.end_date.substr(14,2) }}분</div>
        <v-divider></v-divider>
        <div class="text-h6 mb-1">
          <v-icon icon="mdi-web"></v-icon> 장소
        </div>
        <div class="text-caption">{{ listItems.location }}</div>
        <v-divider></v-divider>
        <div class="text-h6 mb-1">
          <v-icon icon="mdi-note-outline"></v-icon> 설명
        </div>
        <div class="text-caption">{{ listItems.memo }}</div>
        <v-divider></v-divider>
        <div class="text-h6 mb-1">
          <v-icon icon="mdi-account-group"></v-icon> 모집인원
        </div>
        <div class="text-caption">{{ listItems.total }}</div>
        <v-divider></v-divider>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn color="primary" variant="outlined" @click="gotoHostview">
        돌아가기
      </v-btn>
      <v-btn color="primary" variant="outlined" @click="putData">
        내 일정에 추가하기
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>

  </v-container>


</template>

<script>
//import router from '@/router';


//Vue.component('v-selector',vSelect)
  export default {
    data: () => ({
      loaded: false,
      loading: false,
  
      deliver: "",
      request_URL: "",
      listItems: {},


      title:"",
      location:"",
      description:"",
      total:"",
      

    }),

    methods: {

      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
      gotoHostview(){
      this.$router.push('/host');
      },

      async getData() {
      const res = await fetch(this.request_URL);
        const finalRes = await res.json();
        this.listItems = finalRes; 
    },

    async putData() {     
      fetch(this.request_URL2, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
  
      }).then((response) => console.log(response));
      alert("내 일정에 추가하였습니다")     
    },

    myfunc(item){
      return item.substr(0,4)
    }

    },

    mounted() {
      this.deliver = this.$route.query.delivery
      this.request_URL="".concat("http://127.0.0.1:8000/api/host/id=",this.deliver)
      this.getData()
      console.log(this.listItems)
    },

    computed: {
        
      request_URL2: function() {
         return "".concat("http://127.0.0.1:8000/api/host/add?userid=2017314910","&id=",this.deliver)   
    },


  }
  }
</script>

