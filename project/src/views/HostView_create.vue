<template>

  <v-container>
    <v-row>
        <h1>&nbsp;&nbsp;내가 일정을 만들 수도 있어요!</h1>
    </v-row>
     
  <v-row>
    <v-col cols="4"> 
        <v-text-field
          :loading="loading"
          density="compact"
          variant="tonal"
          label="일정명을 입력하세요"
          v-model="filters"
          single-line
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </v-col>
  </v-row>
  
  <v-row>
    

  </v-row>

  <v-row>
    <v-btn color="primary" icon="mdi-plus" size="small" @click="gotoHostview"></v-btn>
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
