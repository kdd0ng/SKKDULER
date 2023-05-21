<template>  
  <div class="pa-5">
      <v-row>
          <v-col cols="12" md="6" class="mb-4">
              <v-row>
                  <v-col cols="6">
                      <!--날짜 선택 메뉴표시: 
                      ref="dateOpen"으로 컴포넌트 참조, 
                      'v-model'로 선택한 날짜를 start에 바인딩,
                      메뉴를 열린 상태로 유지 / start 데이터 속성에 선택 값 저장,
                      offset-y로 수직 위치 조정-->
                      <v-menu   
                              ref="dateOpen"
                              v-model="dateOpen"
                              :close-on-content-click="false"
                              :return-value.sync="start"
                              offset-y
                      >
                          <!--<v-menu>의 활성화 기능 제어:
                          activator 슬롯 정의 / 슬롯 내부의 변수 'on'은 이벤트 리스너 객체를 가리킴-->
                          <template v-slot:activator="{ on }">

                              <!--텍스트 필드 컴포넌트(텍스트 입력상자 생성):
                              텍스트필드의 레이블은 "Start Date",
                              텍스트 필드 앞에 calendar 아이콘 표시,
                              밀집형 텍스트 간격 / 읽기 전용 / 외곽선 모서리 강조 / 세부 정보 숨김,
                              'on'으로 이벤트 처리(메뉴가 열리는 동작 구현)-->
                              <v-text-field
                                      v-model="start"
                                      label="Start Date"
                                      prepend-icon="mdi-calendar"
                                      dense
                                      readonly
                                      outlined
                                      hide-details
                                      v-on="on"
                              ></v-text-field>
                          </template>
                          
                          <!--날짜 선택을 위한 달력 표시:
                          제목 표시되지 않도록 설정-->
                          <v-date-picker v-model="start"
                                         no-title
                          >
                              <!--빈 공간을 만드는 컴포넌트(오른쪽 정렬):
                              "Cancel"버튼은 날짜선택기를 닫음,
                              "OK"버튼으로 선택한 날짜 저장 후 날짜선택기를 닫음-->
                              <v-spacer/>
                              <v-btn text color="primary" @click="dateOpen = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="$refs.dateOpen.save(start)">OK</v-btn>
                          </v-date-picker>
                      </v-menu>
                  </v-col>

                  <v-col cols="6">
                      <!--캘린더의 표시 유형 선택(드롭다운 메뉴):
                      'v-model'로 선택한 값을 type에 바인딩,
                      item 속성으로 메뉴 항목 설정(객체 배열 형태의 항목),
                      레이블은 "Type" / 수직 가운데 정렬-->
                      <v-select
                              v-model="type"
                              :items="typeOptions"
                              label="Type"
                              class="my-auto"
                              hide-details
                              outlined
                              dense
                      ></v-select>
                  </v-col>
              </v-row>

              <v-sheet height="500">
                  <!--캘린더 컴포넌스 생성:
                  이벤트색상 동적 설정,
                  event 속성을 사용해 캘린더에 표시될 이벤트 데이터 설정,
                  start 속성을 사용해 캘린더 시작 날짜 설정,
                  type 속성을 사용해 캘린더의 표시 유형 설정,
                  날짜 클릭시 open 메소드 호출,
                  이벤트 클릭시 showEvent 메소드 호출,
                  더 많은 이벤트 클릭시 moreEvent 메소드 호출,
                  시간 클릭시 open 메소드 호출,
                  ref="calendar"로 컴포넌트 참조, 
                  'v-model'로 날짜 업데이트-->
                  <v-calendar
                    :event-color="getEventColor"
                    :events="events"
                    :start="start"
                    :type="type"
                    
                    @click:date="openDialog"
                    @click:event="showEvent"
                    @click:more="moreEvent"
                    @click:time="openDialog"
                    
                    ref="calendar"
                    v-model="start"
                  ></v-calendar>
              </v-sheet>
          </v-col>
      </v-row>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      dateOpen: false,
      start: '',
      type: 'month',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
      ],
      events: [], // 이벤트 데이터를 저장할 배열
      eventMessage: '', // 이벤트 메시지를 저장할 변수
    };
  },
  methods: {
    openDialog(date) {
      this.start = date;
      this.showEvent();  //this.$router.push('/calendar_add');
    },
    saveDate() {
      this.dateOpen = false;
    },
    showEvent() {
      // 이벤트를 표시하는 로직을 구현합니다. 
      this.eventMessage = '이벤트가 선택되었습니다: ' + this.start;
    },
    moreEvent() {
      // 더 많은 이벤트를 표시하는 로직을 구현합니다.
      // 예시로 메시지를 설정하여 화면에 표시합니다.
      this.eventMessage = '더 많은 이벤트를 표시합니다.';
    },
  },
};
</script>

<style>
.event-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #eee;
}
</style>