<template>

  <v-container>
    <v-row>
        <h1>&nbsp;&nbsp;학우들이 주최한 일정 살펴보기</h1>
    </v-row>
    <v-row>
      <v-col cols="4"> 
        <v-text-field
          :loading="loading"
          density="compact"
          variant="solo"
          label="해시태그 및  키워드로 검색할 수 있습니다(제목/작성자)"
          v-model="filters"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </v-col>
      <v-col cols="6"></v-col>
      
      <v-col cols="2">  
        <select v-model="selected">
          <option
            v-for="(item, index) in selectList"
            :key="index"
            :value="item.value"
            >{{ item.name }}</option
          >
        </select>     
      </v-col>
  </v-row>
    
  <v-row>

    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          제목
        </th>
        <th class="text-left">
          개최일
        </th>
        <th class="text-left">
          작성자
        </th>
        <th class="text-left">
          참여/모집인원
        </th>
        <th class="text-left">
          조회수
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in filteredRows"
        :key="item.name"
      >
        <td>{{ item.title }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.writer }}</td>
        <td>{{ item.personnel }}</td>
        <td>{{ item.views }}</td>
      </tr>
    </tbody>
  </v-table>

  </v-row>

  <v-row>
    <v-btn color="primary" icon="mdi-plus" size="small"></v-btn>
  </v-row>

  <v-row>
  </v-row>
  <!--<span>선택 value: {{ selected }}</span>-->
  </v-container>


</template>

<script>

//Vue.component('v-selector',vSelect)
  export default {
    data: () => ({
      loaded: false,
      loading: false,
      
  
      selected:"/05/",
      selectList: [
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
