<template>

  <v-container>
    <v-row>
        <h1>&nbsp;&nbsp;학우들이 주최한 일정 살펴보기</h1>
    </v-row>
  <div class="text-center">
    <v-row>
      <v-col cols="5"> 
          {{ listItems.title }}
        </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <h3>&nbsp;&nbsp;날짜 및 시간</h3>
      <h3 v-if="listItems.start_date">{{ listItems.start_date.substr(0,4) }}</h3>
      <h3>&nbsp;&nbsp;년</h3>
      <h3 v-if="listItems.start_date">{{ listItems.start_date.substr(5,2) }}</h3>
      <h3>&nbsp;&nbsp;월</h3>
      <h3 v-if="listItems.start_date">{{ listItems.start_date.substr(8,2) }}</h3>
      <h3>&nbsp;&nbsp;일</h3>
      <h3 v-if="listItems.start_date">{{ listItems.start_date.substr(11,2) }}</h3>
      <h3>&nbsp;&nbsp;시</h3>
      <h3 v-if="listItems.start_date">{{ listItems.start_date.substr(14,2) }}</h3>
      <h3>&nbsp;&nbsp;분</h3>
      <h3>&nbsp;&nbsp;~</h3>
      <!--end 시간-->
      <h3 v-if="listItems.end_date">{{ listItems.end_date.substr(0,4) }}</h3>
      <h3>&nbsp;&nbsp;년</h3>
      <h3 v-if="listItems.end_date">{{ listItems.end_date.substr(5,2) }}</h3>
      <h3>&nbsp;&nbsp;월</h3>
      <h3 v-if="listItems.end_date">{{ listItems.end_date.substr(8,2) }}</h3>
      <h3>&nbsp;&nbsp;일</h3>
      <h3 v-if="listItems.end_date">{{ listItems.end_date.substr(11,2) }}</h3>
      <h3>&nbsp;&nbsp;시</h3>
      <h3 v-if="listItems.end_date">{{ listItems.end_date.substr(14,2) }}</h3>
      <h3>&nbsp;&nbsp;분</h3>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <h3>&nbsp;&nbsp;장소</h3>
      <v-col cols="5"> 
        {{ listItems.location }}
        </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <h3>&nbsp;&nbsp;설명</h3>
      <v-col cols="5"> 
        {{ listItems.memo }}
        </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <h3>&nbsp;&nbsp;모집인원</h3>
      <v-col cols="1"> 
        {{ listItems.total }}
        </v-col>
          <h3>&nbsp;&nbsp;명</h3>    
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <v-btn color="primary" size="small" @click="gotoHostview">돌아가기</v-btn>
      <v-col cols="9"></v-col>
      <v-btn color="primary" size="small" @click="putData">내 일정에 추가하기</v-btn>
    </v-row>
  </div>
<!--
  <v-row><h10>{{ request_URL }}</h10></v-row>
  <v-row><h10>{{ request_URL2 }}</h10></v-row>
  <h1>{{ deliver }}</h1>
-->


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

