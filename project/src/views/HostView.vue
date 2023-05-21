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
      <v-col cols="5"> 
        <v-text-field
          :loading="loading"
          density="compact"
          variant="solo"
          label="해시태그 및 키워드로 검색할 수 있습니다(제목/작성자)"
          v-model="filters"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </v-col>
      <v-col cols="1">    
        <div class="text-h6 mb-1">
          <v-icon icon = "mdi-format-list-bulleted"></v-icon>
        <select v-model="selected">
          <option
            v-for="(item, index) in selectList"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>    
      </div> 
      </v-col>
  </v-row>
    
  <v-row>

    <v-table height = 500px>
    <thead>
      <tr>
        <th class="text-left" width=250px>
          제목
        </th>
        <th class="text-left" width=250px>
          개최일
        </th>
        <th class="text-left" width=250px>
          작성자(id)
        </th>
        <th class="text-left" width=250px>
          참여/모집인원
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in filteredRows"
        :key="item.name"
      >
        <td @click="gotoHostview_search(item.id)">{{ item.title }}</td>
        <td>{{ item.start_date.substr(0,10) }}</td>
        <td>{{ item.userid }}</td>
        <td>{{ item.current }}/{{ item.total }}</td>
      </tr>
    </tbody>
  </v-table>

  </v-row>
  <v-row>
      <h1>&nbsp;&nbsp;</h1>
  </v-row>
  <v-row>
    <v-btn color="primary" icon="mdi-plus" size="small" @click="gotoHostview_create"></v-btn>
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
  <!--<span>선택 value: {{ selected }}</span>-->
  </v-container>


</template>

<script>
//import axios from 'axios'
//Vue.component('v-selector',vSelect)
  export default {
    data: () => ({
      loaded: false,
      loading: false,
      
      testvalue:"testing",
  
      selected:"-05-",
      selectList: [
        { name: "1월", value: "-01-" },
        { name: "2월", value: "-02-" },
        { name: "3월", value: "-03-" },
        { name: "4월", value: "-04-" },
        { name: "5월", value: "-05-" },
        { name: "6월", value: "-06-" },
        { name: "7월", value: "-07-" },
        { name: "8월", value: "-08-" },
        { name: "9월", value: "-09-" },
        { name: "10월", value: "-10-" },
        { name: "11월", value: "-11-" },
        { name: "12월", value: "-12-" },
      ],
      filters:"",
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
      //dialog: false,
      listItems: [],

    }),

    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
      gotoHostview_create(){
      this.$router.push('/host_create');
    },

    gotoHostview_search(id){
      this.$router.push({path: '/host_search',query: { delivery: id }});
    },

    async getData() {
      const res = await fetch("http://127.0.0.1:8000/api/host");
        const finalRes = await res.json();
        this.listItems = finalRes; 
    },
    
    },
    mounted() {
      this.getData()
      
    },
    computed: {
  filteredRows() {
    return this.listItems.filter(row => {
      const title = row.title.toLowerCase();
      const userid = row.userid.toLowerCase();
      const start_date = row.start_date;
      const searchTerm = this.filters.toLowerCase();
      const searchTerm_ = this.selected;

      return (title.includes(searchTerm) || userid.includes(searchTerm)) && start_date.includes(searchTerm_);
    });
  }
},    
  }
</script>

