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
        <h1>&nbsp;&nbsp;내가 일정을 만들 수도 있어요!</h1>
    </v-row>
    <v-row>
        <h1>&nbsp;&nbsp;</h1>
    </v-row>
<!--
  <v-row><h10>{{ request_URL }}</h10></v-row>
-->
<v-card
    class="mx-auto"
    max-width="750"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <v-text-field
            :loading="loading"
            density="compact"
            variant="solo"
            label="일정명을 입력하세요"
            v-model="title"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
          <v-divider></v-divider>
        <div class="text-h6 mb-1">
          <v-icon icon="mdi-calendar-month"></v-icon> 날짜 및 시간
        </div>
        <div class="text-h7 mb-1">
        <select v-model="selected_start_year">
          <option
            v-for="(item, index) in selectList_start_year"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     

        <select v-model="selected_start_month">
          <option
            v-for="(item, index) in selectList_start_month"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     

        <select v-model="selected_start_date">
          <option
            v-for="(item, index) in selectList_start_date"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     

        <select v-model="selected_start_hour">
          <option
            v-for="(item, index) in selectList_start_hour"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
 
        <select v-model="selected_start_min">
          <option
            v-for="(item, index) in selectList_start_min"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
-
        <select v-model="selected_end_year">
          <option
            v-for="(item, index) in selectList_end_year"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
 
        <select v-model="selected_end_month">
          <option
            v-for="(item, index) in selectList_end_month"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
 
        <select v-model="selected_end_date">
          <option
            v-for="(item, index) in selectList_end_date"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     

        <select v-model="selected_end_hour">
          <option
            v-for="(item, index) in selectList_end_hour"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
  
        <select v-model="selected_end_min">
          <option
            v-for="(item, index) in selectList_end_min"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>    
        </div> 
        <v-divider></v-divider>
        <div class="text-h6 mb-1">
          <v-icon icon="mdi-web"></v-icon> 장소
        </div>
        <v-text-field
            :loading="loading"
            density="compact"
            variant="solo"
            label=""
            v-model="location"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
          <v-divider></v-divider>
        <div class="text-h6 mb-1">
          <v-icon icon="mdi-note-outline"></v-icon> 설명
        </div>
        <v-text-field
            :loading="loading"
            density="compact"
            variant="solo"
            label=""
            v-model="description"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
          <v-divider></v-divider>
        <div class="text-h6 mb-1">
          <v-icon icon="mdi-account-group"></v-icon> 모집인원
        </div>   
        <v-divider></v-divider> 
        <div class="text-h7 mb-1">
          <v-text-field
            :loading="loading"
            density="compact"
            variant="solo"
            label="5"
            v-model="total"
            @keypress="isNumber($event)"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>명</div>
          <v-divider></v-divider> 
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn color='primary' variant="outlined" @click="gotoHostview">
        돌아가기
      </v-btn>
      <v-btn color='primary' variant="outlined" @click="postData">
        목록에 추가하기
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

//Vue.component('v-selector',vSelect)
  export default {
    data: () => ({
      loaded: false,
      loading: false,
      
  
      selected_start_year:"2023",
      selectList_start_year: [
        { name: "2023년 ", value: "2023" },
        { name: "2024년 ", value: "2024" },
        { name: "2025년 ", value: "2025" },
      ],
      selected_start_month:"05",
      selectList_start_month: [
        { name: "1월 ", value: "01" },
        { name: "2월 ", value: "02" },
        { name: "3월 ", value: "03" },
        { name: "4월 ", value: "04" },
        { name: "5월 ", value: "05" },
        { name: "6월 ", value: "06" },
        { name: "7월 ", value: "07" },
        { name: "8월 ", value: "08" },
        { name: "9월 ", value: "09" },
        { name: "10월 ", value: "10" },
        { name: "11월 ", value: "11" },
        { name: "12월 ", value: "12" },
      ],
      selected_start_date:"19",
      selectList_start_date: [
        { name: "1일 ", value: "01" },
        { name: "2일 ", value: "02" },
        { name: "3일 ", value: "03" },
        { name: "4일 ", value: "04" },
        { name: "5일 ", value: "05" },
        { name: "6일 ", value: "06" },
        { name: "7일 ", value: "07" },
        { name: "8일 ", value: "08" },
        { name: "9일 ", value: "09" },
        { name: "10일 ", value: "10" },
        { name: "11일 ", value: "11" },
        { name: "12일 ", value: "12" },
        { name: "13일 ", value: "13" },
        { name: "14일 ", value: "14" },
        { name: "15일 ", value: "15" },
        { name: "16일 ", value: "16" },
        { name: "17일 ", value: "17" },
        { name: "18일 ", value: "18" },
        { name: "19일 ", value: "19" },
        { name: "20일 ", value: "20" },
        { name: "21일 ", value: "21" },
        { name: "22일 ", value: "22" },
        { name: "23일 ", value: "23" },
        { name: "24일 ", value: "24" },
        { name: "25일 ", value: "25" },
        { name: "26일 ", value: "26" },
        { name: "27일 ", value: "27" },
        { name: "28일 ", value: "28" },
        { name: "29일 ", value: "29" },
        { name: "30일 ", value: "30" },
        { name: "31일 ", value: "31" },
      ],
      selected_start_hour:"00",
      selectList_start_hour: [
        { name: "00시 ", value: "00" },
        { name: "01시 ", value: "01" },
        { name: "02시 ", value: "02" },
        { name: "03시 ", value: "03" },
        { name: "04시 ", value: "04" },
        { name: "05시 ", value: "05" },
        { name: "06시 ", value: "06" },
        { name: "07시 ", value: "07" },
        { name: "08시 ", value: "08" },
        { name: "09시 ", value: "09" },
        { name: "10시 ", value: "10" },
        { name: "11시 ", value: "11" },
        { name: "12시 ", value: "12" },
        { name: "13시 ", value: "13" },
        { name: "14시 ", value: "14" },
        { name: "15시 ", value: "15" },
        { name: "16시 ", value: "16" },
        { name: "17시 ", value: "17" },
        { name: "18시 ", value: "18" },
        { name: "19시 ", value: "19" },
        { name: "20시 ", value: "20" },
        { name: "21시 ", value: "21" },
        { name: "22시 ", value: "22" },
        { name: "23시 ", value: "23" },
      ],
      selected_start_min:"00",
      selectList_start_min: [
        { name: "0분 ", value: "00" },
        { name: "15분 ", value: "15" },
        { name: "30분 ", value: "30" },
        { name: "45분 ", value: "45" },
      ],

      //end 시간

      selected_end_year:"2023",
      selectList_end_year: [
        { name: "2023년 ", value: "2023" },
        { name: "2024년 ", value: "2024" },
        { name: "2025년 ", value: "2025" },
      ],
      selected_end_month:"05",
      selectList_end_month: [
        { name: "1월 ", value: "01" },
        { name: "2월 ", value: "02" },
        { name: "3월 ", value: "03" },
        { name: "4월 ", value: "04" },
        { name: "5월 ", value: "05" },
        { name: "6월 ", value: "06" },
        { name: "7월 ", value: "07" },
        { name: "8월 ", value: "08" },
        { name: "9월 ", value: "09" },
        { name: "10월 ", value: "10" },
        { name: "11월 ", value: "11" },
        { name: "12월 ", value: "12" },
      ],
      selected_end_date:"19",
      selectList_end_date: [
        { name: "1일 ", value: "01" },
        { name: "2일 ", value: "02" },
        { name: "3일 ", value: "03" },
        { name: "4일 ", value: "04" },
        { name: "5일 ", value: "05" },
        { name: "6일 ", value: "06" },
        { name: "7일 ", value: "07" },
        { name: "8일 ", value: "08" },
        { name: "9일 ", value: "09" },
        { name: "10일 ", value: "10" },
        { name: "11일 ", value: "11" },
        { name: "12일 ", value: "12" },
        { name: "13일 ", value: "13" },
        { name: "14일 ", value: "14" },
        { name: "15일 ", value: "15" },
        { name: "16일 ", value: "16" },
        { name: "17일 ", value: "17" },
        { name: "18일 ", value: "18" },
        { name: "19일 ", value: "19" },
        { name: "20일 ", value: "20" },
        { name: "21일 ", value: "21" },
        { name: "22일 ", value: "22" },
        { name: "23일 ", value: "23" },
        { name: "24일 ", value: "24" },
        { name: "25일 ", value: "25" },
        { name: "26일 ", value: "26" },
        { name: "27일 ", value: "27" },
        { name: "28일 ", value: "28" },
        { name: "29일 ", value: "29" },
        { name: "30일 ", value: "30" },
        { name: "31일 ", value: "31" },
      ],
      selected_end_hour:"00",
      selectList_end_hour: [
        { name: "00시 ", value: "00" },
        { name: "01시 ", value: "01" },
        { name: "02시 ", value: "02" },
        { name: "03시 ", value: "03" },
        { name: "04시 ", value: "04" },
        { name: "05시 ", value: "05" },
        { name: "06시 ", value: "06" },
        { name: "07시 ", value: "07" },
        { name: "08시 ", value: "08" },
        { name: "09시 ", value: "09" },
        { name: "10시 ", value: "10" },
        { name: "11시 ", value: "11" },
        { name: "12시 ", value: "12" },
        { name: "13시 ", value: "13" },
        { name: "14시 ", value: "14" },
        { name: "15시 ", value: "15" },
        { name: "16시 ", value: "16" },
        { name: "17시 ", value: "17" },
        { name: "18시 ", value: "18" },
        { name: "19시 ", value: "19" },
        { name: "20시 ", value: "20" },
        { name: "21시 ", value: "21" },
        { name: "22시 ", value: "22" },
        { name: "23시 ", value: "23" },
      ],
      selected_end_min:"00",
      selectList_end_min: [
        { name: "0분 ", value: "00" },
        { name: "15분 ", value: "15" },
        { name: "30분 ", value: "30" },
        { name: "45분 ", value: "45" },
      ],
      title:"",
      location:"",
      description:"",
      total:"",
      studentid:"",
      

    }),

    methods: {

      isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode === 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },

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

      async postData() {     
      fetch(this.request_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
      }).then((response) => console.log(response));
      alert("목록에 추가하였습니다")
      }

    },

    mounted() {
      this.studentid = Number(this.$store.state.studentId);
    },

    computed: {
        
        request_URL: function() {
         return "".concat("http://127.0.0.1:8000/api/host/create?userid=",this.studentid,"&title=",encodeURIComponent(this.title),"&start_date=",this.selected_start_year,"-",this.selected_start_month,"-",this.selected_start_date,"%20",this.selected_start_hour,"%3A",this.selected_start_min,"&end_date=",this.selected_end_year,"-",this.selected_end_month,"-",this.selected_end_date,"%20",this.selected_end_hour,"%3A",this.selected_end_min,"&location=",encodeURIComponent(this.location),"&description=",encodeURIComponent(this.description),"&total=",this.total)
        },
        
        
 
       },

  }
</script>

