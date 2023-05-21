<template>
    <!--대화상자:
    persistent 속성으로 자동 닫힘 방지-->
    <v-dialog max-width="600px" persistent v-model="dialog">

      <!--카드-->
      <v-card>
        <v-card-title>  <!--카드 제목-->
          <h3>일정 추가</h3>
        </v-card-title>

        <v-card-text>  <!--카드 본문-->
          <v-form class="px-3" ref="form">
            <v-text-field label="일정" v-model="title" prepend-icon="mdi-folder-marker"></v-text-field>
            <v-textarea label="상세설명" v-model="content" prepend-icon="mdi-pencil"></v-textarea>
            
            <v-row>
              <v-col cols="6" class="pb-0">
                <!--시작일 선택하는 드롭다운 메뉴-->
                <v-menu>
                    <!--드롭다운 메뉴가 열리도록 활성화 / 시작일은 받아온 값으로-->
                    <template v-slot:activator="{on}">
                        <v-text-field slot="activator" label="시작일" readonly prepend-icon="mdi-calendar-month" v-on="on" :value="startDate" class=""></v-text-field>
                    </template>
                    
                    <!--날짜 선택기: 시작일을 선택해서 변경하도록-->
                    <v-date-picker v-model="startDate"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6" class="pb-0">
                <!--시작시간 선택하는 드롭다운 메뉴-->
                <v-menu :close-on-content-click="false" v-model="startTimer" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-text-field label="시작 시간" readonly :value="startTime" prepend-icon="mdi-timer" v-on="on"></v-text-field>
                    </template>

                    <!--시간 선택기-->
                    <v-time-picker v-if="startTimer" v-model="startTime">
                        <v-btn class="mx-auto" @click="selectTime">선택</v-btn>
                    </v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
  
            <v-row>
              <v-col cols="6" class="pt-0">
                <v-menu>
                  <template v-slot:activator="{on}">
                    <v-text-field slot="activator" label="종료일" readonly prepend-icon="mdi-calendar-month" v-on="on" :value="endDate" class=""></v-text-field>
                  </template>

                  <v-date-picker v-model="endDate" :allowed-dates="allowedDates"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6" class="pt-0">

                <v-menu :close-on-content-click="false" v-model="endTimer" offset-y>

                  <template v-slot:activator="{ on }">
                    <v-text-field label="종료 시간" readonly :value="endTime" prepend-icon="mdi-timer" v-on="on"></v-text-field>
                  </template>

                  <v-time-picker v-if="endTimer" v-model="endTime">
                    <v-btn class="mx-auto" @click="selectTime">선택</v-btn>
                  </v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
  
            <div class="text-center">
              <v-btn text class="primary white--text mx-2 mt-3" @click="submit">
                추가
              </v-btn>
              <v-btn text class="primary white--text mx-2 mt-3" @click="close">
                닫기
              </v-btn>
            </div>
          </v-form>

          <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" top right>
            {{ snackbar.text }}
          </v-snackbar>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        title: '',
        content: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        startTimer: false,
        endTimer: false,
        snackbar: {
          show: false,
          text: '일정추가 성공',
          color: '#00FF00',
          timeout: 2000,
        },
      };
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          const calendar = {
            title: this.title,
            content: this.content,
            startDate: this.startDate,
            startTime: this.startTime,
            endDate: this.endDate,
            endTime: this.endTime,
          };
          this.showSnackbar('일정이 추가되었습니다.', 'success');
          this.dialog = false;
        } else {
          this.showSnackbar('일정을 올바르게 입력해주세요.', 'error');
        }
    },
    
      close() {
        this.dialog = false;
      },
      selectTime() {
        this.endTimer = false;
        this.startTimer = false;
      },
      allowedDates(val) {
        const endDate = val.split('-').reduce((a, b) => a + b);
        const startDate = this.startDate.split('-').reduce((a, b) => a + b);
        return endDate >= startDate;
      },
      showSnackbar(text, color) {
        this.snackbar.text = text;
        this.snackbar.color = color;
        this.snackbar.show = true;
      },
    },
  };
  </script>