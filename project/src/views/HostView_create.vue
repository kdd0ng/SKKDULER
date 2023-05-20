<template>

  <v-container>
    <v-row>
        <h1>&nbsp;&nbsp;내가 일정을 만들 수도 있어요!</h1>
    </v-row>
  <div class="text-center">
    <v-row>
      <v-col cols="5"> 
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
        </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <h3>&nbsp;&nbsp;날짜 및 시간</h3>
      <v-col cols="1">  
        <select v-model="selected_start_year">
          <option
            v-for="(item, index) in selectList_start_year"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <v-col cols="1">  
        <select v-model="selected_start_month">
          <option
            v-for="(item, index) in selectList_start_month"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <v-col cols="1">  
        <select v-model="selected_start_date">
          <option
            v-for="(item, index) in selectList_start_date"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <v-col cols="1">  
        <select v-model="selected_start_hour">
          <option
            v-for="(item, index) in selectList_start_hour"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <v-col cols="1">  
        <select v-model="selected_start_min">
          <option
            v-for="(item, index) in selectList_start_min"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <h3>&nbsp;&nbsp;~</h3>

      <!--end 시간-->

      <v-col cols="1">  
        <select v-model="selected_end_year">
          <option
            v-for="(item, index) in selectList_end_year"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <v-col cols="1">  
        <select v-model="selected_end_month">
          <option
            v-for="(item, index) in selectList_end_month"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <v-col cols="1">  
        <select v-model="selected_end_date">
          <option
            v-for="(item, index) in selectList_end_date"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <v-col cols="1">  
        <select v-model="selected_end_hour">
          <option
            v-for="(item, index) in selectList_end_hour"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
      <v-col cols="1">  
        <select v-model="selected_end_min">
          <option
            v-for="(item, index) in selectList_end_min"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <h3>&nbsp;&nbsp;장소</h3>
      <v-col cols="5"> 
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
        </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <h3>&nbsp;&nbsp;설명</h3>
      <v-col cols="5"> 
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
        </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>
    <v-row>
      <h3>&nbsp;&nbsp;모집인원</h3>
      <v-col cols="1"> 
          <v-text-field
            :loading="loading"
            density="compact"
            variant="solo"
            label="5"
            v-model="total"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
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
      <v-btn color="primary" size="small" @click="gotoHostview">내 일정에 추가하기</v-btn>
    </v-row>
  </div>
  <!--<span>선택 value: {{ selected }}</span>-->
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
        { name: "2023년", value: "2023" },
        { name: "2024년", value: "2024" },
        { name: "2025년", value: "2025" },
      ],
      selected_start_month:"/05/",
      selectList_start_month: [
        { name: "1월", value: "/01/" },
        { name: "2월", value: "/02/" },
        { name: "3월", value: "/03/" },
        { name: "4월", value: "/04/" },
        { name: "5월", value: "/05/" },
        { name: "6월", value: "/06/" },
        { name: "7월", value: "/07/" },
        { name: "8월", value: "/08/" },
        { name: "9월", value: "/09/" },
        { name: "10월", value: "/10/" },
        { name: "11월", value: "/11/" },
        { name: "12월", value: "/12/" },
      ],
      selected_start_date:"19",
      selectList_start_date: [
        { name: "1일", value: "01" },
        { name: "2일", value: "02" },
        { name: "3일", value: "03" },
        { name: "4일", value: "04" },
        { name: "5일", value: "05" },
        { name: "6일", value: "06" },
        { name: "7일", value: "07" },
        { name: "8일", value: "08" },
        { name: "9일", value: "09" },
        { name: "10일", value: "10" },
        { name: "11일", value: "11" },
        { name: "12일", value: "12" },
        { name: "13일", value: "13" },
        { name: "14일", value: "14" },
        { name: "15일", value: "15" },
        { name: "16일", value: "16" },
        { name: "17일", value: "17" },
        { name: "18일", value: "18" },
        { name: "19일", value: "19" },
        { name: "20일", value: "20" },
        { name: "21일", value: "21" },
        { name: "22일", value: "22" },
        { name: "23일", value: "23" },
        { name: "24일", value: "24" },
        { name: "25일", value: "25" },
        { name: "26일", value: "26" },
        { name: "27일", value: "27" },
        { name: "28일", value: "28" },
        { name: "29일", value: "29" },
        { name: "30일", value: "30" },
        { name: "31일", value: "31" },
      ],
      selected_start_hour:"00",
      selectList_start_hour: [
        { name: "00시", value: "00" },
        { name: "01시", value: "01" },
        { name: "02시", value: "02" },
        { name: "03시", value: "03" },
        { name: "04시", value: "04" },
        { name: "05시", value: "05" },
        { name: "06시", value: "06" },
        { name: "07시", value: "07" },
        { name: "08시", value: "08" },
        { name: "09시", value: "09" },
        { name: "10시", value: "10" },
        { name: "11시", value: "11" },
        { name: "12시", value: "12" },
        { name: "13시", value: "13" },
        { name: "14시", value: "14" },
        { name: "15시", value: "15" },
        { name: "16시", value: "16" },
        { name: "17시", value: "17" },
        { name: "18시", value: "18" },
        { name: "19시", value: "19" },
        { name: "20시", value: "20" },
        { name: "21시", value: "21" },
        { name: "22시", value: "22" },
        { name: "23시", value: "23" },
      ],
      selected_start_min:"00",
      selectList_start_min: [
        { name: "0분", value: "00" },
        { name: "15분", value: "15" },
        { name: "30분", value: "30" },
        { name: "45분", value: "45" },
      ],

      //end 시간

      selected_end_year:"2023",
      selectList_end_year: [
        { name: "2023년", value: "2023" },
        { name: "2024년", value: "2024" },
        { name: "2025년", value: "2025" },
      ],
      selected_end_month:"/05/",
      selectList_end_month: [
        { name: "1월", value: "/01/" },
        { name: "2월", value: "/02/" },
        { name: "3월", value: "/03/" },
        { name: "4월", value: "/04/" },
        { name: "5월", value: "/05/" },
        { name: "6월", value: "/06/" },
        { name: "7월", value: "/07/" },
        { name: "8월", value: "/08/" },
        { name: "9월", value: "/09/" },
        { name: "10월", value: "/10/" },
        { name: "11월", value: "/11/" },
        { name: "12월", value: "/12/" },
      ],
      selected_end_date:"19",
      selectList_end_date: [
        { name: "1일", value: "01" },
        { name: "2일", value: "02" },
        { name: "3일", value: "03" },
        { name: "4일", value: "04" },
        { name: "5일", value: "05" },
        { name: "6일", value: "06" },
        { name: "7일", value: "07" },
        { name: "8일", value: "08" },
        { name: "9일", value: "09" },
        { name: "10일", value: "10" },
        { name: "11일", value: "11" },
        { name: "12일", value: "12" },
        { name: "13일", value: "13" },
        { name: "14일", value: "14" },
        { name: "15일", value: "15" },
        { name: "16일", value: "16" },
        { name: "17일", value: "17" },
        { name: "18일", value: "18" },
        { name: "19일", value: "19" },
        { name: "20일", value: "20" },
        { name: "21일", value: "21" },
        { name: "22일", value: "22" },
        { name: "23일", value: "23" },
        { name: "24일", value: "24" },
        { name: "25일", value: "25" },
        { name: "26일", value: "26" },
        { name: "27일", value: "27" },
        { name: "28일", value: "28" },
        { name: "29일", value: "29" },
        { name: "30일", value: "30" },
        { name: "31일", value: "31" },
      ],
      selected_end_hour:"00",
      selectList_end_hour: [
        { name: "00시", value: "00" },
        { name: "01시", value: "01" },
        { name: "02시", value: "02" },
        { name: "03시", value: "03" },
        { name: "04시", value: "04" },
        { name: "05시", value: "05" },
        { name: "06시", value: "06" },
        { name: "07시", value: "07" },
        { name: "08시", value: "08" },
        { name: "09시", value: "09" },
        { name: "10시", value: "10" },
        { name: "11시", value: "11" },
        { name: "12시", value: "12" },
        { name: "13시", value: "13" },
        { name: "14시", value: "14" },
        { name: "15시", value: "15" },
        { name: "16시", value: "16" },
        { name: "17시", value: "17" },
        { name: "18시", value: "18" },
        { name: "19시", value: "19" },
        { name: "20시", value: "20" },
        { name: "21시", value: "21" },
        { name: "22시", value: "22" },
        { name: "23시", value: "23" },
      ],
      selected_end_min:"00",
      selectList_end_min: [
        { name: "0분", value: "00" },
        { name: "15분", value: "15" },
        { name: "30분", value: "30" },
        { name: "45분", value: "45" },
      ],
      title:"",
      location:"",
      description:"",
      total:"",
      rows: [
          {
            title: 'Frozen Yogurt',
            date: '2023/05/19',
            writer: '홍길동',
            personnel: '1/2',
            views: 0,
          },
          {
            title: 'Ice cream sandwich',
            date: '2023/05/19',
            writer: '두루미',
            personnel: '1/2',
            views: 0,
          },
          {
            title: 'Eclair',
            date: '2023/06/19',
            writer: '거북이',
            personnel: '1/2',
            views: 0,
          },
          {
            title: 'Cupcake',
            date: '2023/06/19',
            writer: '춘향이',
            personnel: '1/2',
            views: 0,
          },
        ],
      dialog: false,

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
      }
    },

    computed: {
  filteredRows() {
    return this.rows.filter(row => {
      const title = row.title.toLowerCase();
      const writer = row.writer.toLowerCase();
      const date = row.date;
      const searchTerm = this.filters.toLowerCase();
      const searchTerm_ = this.selected;

      return (title.includes(searchTerm) || writer.includes(searchTerm)) && date.includes(searchTerm_);
    });
  }
},    
  }
</script>
