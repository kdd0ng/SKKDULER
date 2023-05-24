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
  </v-container>

  <v-row>
      <v-divider></v-divider>
      <br>
  </v-row>

  <div>
    <v-row>
        <h5>&nbsp;&nbsp;</h5>
        <h1>&nbsp;&nbsp;내 일정 한번에 확인하기</h1>
    </v-row>
    <div class="dropdown">
      <v-row>
        <h3>&nbsp;&nbsp;</h3>
      </v-row>
      <label for="calendar-view">&nbsp;&nbsp;&nbsp;&nbsp;달력타입 선택:&nbsp;&nbsp;</label>
      <select id="calendar-view" v-model="calendarView" class="dropdown-select">
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>
      <button class="btn" @click="openDialog">+ 일정 추가</button>
    <div v-if="dialog" class="dialog-overlay">
      <div class="dialog-container">
        <div class="dialog-content">
          <h2>일정 추가</h2>
          <label for="event-memo">설명:</label>
          <textarea id="event-memo" v-model="newEvent.memo"></textarea>
          <label for="event-startdate">시작일시:</label>
          <input id="event-startdate" v-model="newEvent.starttime" type="datetime-local">
          <label for="event-enddate">종료일시:</label>
          <input id="event-enddate" v-model="newEvent.endtime" type="datetime-local">
          <label for="event-location">위치:</label>
          <input id="event-location" v-model="newEvent.location" type="text">
          <div>
            <v-switch v-model="toggleValue" :label="toggleLabel"></v-switch>
          </div>
          <div class="btn-container">
            <button class="btn" @click="addEvent">추가</button>
            <button class="btn" @click="closeDialog">취소</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="calendar">
      <div class="calendar-header">
        <button @click="prev">&lt;</button>
        <h2>{{ calendarHeaderText }}</h2>
        <button @click="next">&gt;</button>
      </div>
      <div class="calendar-body">
        <div v-if="calendarView === 'month'">
          <div class="week">
            <div v-for="dayOfWeek in daysOfWeek" :key="dayOfWeek" class="day day-header">{{ dayOfWeek }}</div>
          </div>
          <div class="week" v-for="week in calendar" :key="week">
            <div v-for="day in week" :key="day.date" class="day" :class="{ 'day-prev-month': day.prevMonth, 'day-current-month': day.currentMonth, 'day-next-month': day.nextMonth, 'day-selected': day.selected }" @click="selectDay(day)">{{ day.date }}</div>
          </div>
        </div>
        <div v-else-if="calendarView === 'week'">
          <div class="week">
            <div v-for="dayOfWeek in daysOfWeek" :key="dayOfWeek" class="day day-header">{{ dayOfWeek }}</div>
          </div>
          <div class="week">
            <div v-for="day in week" :key="day.date" class="day" :class="{ 'day-prev-month': day.prevMonth, 'day-current-month': day.currentMonth, 'day-next-month': day.nextMonth, 'day-selected': day.selected }" @click="selectDay(day)">{{ day.date }}</div>
          </div>
        </div>
        <div v-else>
            <div class="event">
              <div class="event-date">{{ formatDate(selectedDate) }}에 등록된 전체 일정입니다.</div>
                <br>
                <v-row>
                  <v-divider></v-divider>
                  <br>
                </v-row>
                <div>
                  <h2>예정된 공지사항</h2>
                  <ul>
                    <li><div>제목: 2022학년도 7차 글로벌융합학부 비교과 특강</div></li>
                    <li><div>일시: 2022년 9월 15일 14시</div></li>
                    <li><div>장소: Webex 온라인 미팅</div></li>
                    <li><div>URL: https://cs.skku.edu/ko/news/notice/view/6840</div></li>
                  </ul>
                  <br>
                  <h2>예정된 주최일정</h2>
                  <ul>
                    <li><div>제목: 선배들과의 만남</div></li>
                    <li><div>장소: 국제관</div></li>
                    <li><div>시작일시: 2022년 9월 15일 15시</div></li>
                    <li><div>종료일시: 2022년 9월 15일 16시</div></li>
                    <li><div>주최자: 홍길동</div></li>
                  </ul>
                  <br>
                  <h2>예정된 개인일정</h2>
                  <ul>
                    <li><div>제목: 기계학습 수업</div></li>
                    <li><div>장소: 국제관</div></li>
                    <li><div>시작일시: 2022년 9월 15일 18시</div></li>
                    <li><div>종료일시: 2022년 9월 15일 20시</div></li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      calendarView: 'month',
      dialog: false,
      toggleValue: false,
      toggleLabel: '공개',
      newEvent: {
        id: '1',
        location: '',
        title: '',
        enddate: '',
        startdate: '',
        memo: '',
        isprivate: 0
      }
    };
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonth() {
      return this.currentDate.getMonth();
    },
    daysOfWeek() {
      return ['일', '월', '화', '수', '목', '금', '토'];
    },
    calendarHeaderText() {
      if (this.calendarView === 'month') {
        return `${this.currentYear}년 ${this.currentMonth + 1}월`;
      } else if (this.calendarView === 'week') {
        const firstDayOfWeek = this.getWeekStartDate(this.currentDate);
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        return `${this.formatDate(firstDayOfWeek)} - ${this.formatDate(lastDayOfWeek)}`;
      } else {
        return this.formatDate(this.selectedDate);
      }
    },
    calendar() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());

      const endDate = new Date(lastDay);
      endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

      const calendar = [];
      let week = [];

      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const date = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const selected = this.selectedDate && currentDate.toDateString() === this.selectedDate.toDateString();
        const prevMonth = currentMonth < month;
        const nextMonth = currentMonth > month;

        week.push({ date, prevMonth, currentMonth, nextMonth, selected });

        if (week.length === 7) {
          calendar.push(week);
          week = [];
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return calendar;
    },
    week() {
      const startDate = this.getWeekStartDate(this.currentDate);
      const week = [];
      for (let i = -1; i < 6; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const day = date.getDate();
        const currentMonth = date.getMonth();
        const selected = this.selectedDate && date.toDateString() === this.selectedDate.toDateString();
        const prevMonth = currentMonth < this.currentMonth;
        const nextMonth = currentMonth > this.currentMonth;

        week.push({ date: day, prevMonth, currentMonth, nextMonth, selected });
      }
      return week;
    },
  },
  watch: {
    toggleValue(value){
        this.toggleLabel = value ? '비공개' : '공개';
    }
  },
  methods: {
    prev() {
      if (this.calendarView === 'month') {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
      } else if (this.calendarView === 'week') {
        const firstDayOfWeek = this.getWeekStartDate(this.currentDate);
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 7);
        this.currentDate = firstDayOfWeek;
      } else {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
      }
    },
    next() {
      if (this.calendarView === 'month') {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
      } else if (this.calendarView === 'week') {
        const firstDayOfWeek = this.getWeekStartDate(this.currentDate);
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);
        this.currentDate = firstDayOfWeek;
      } else {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
      }
    },
    selectDay(day) {
      if (this.calendarView === 'month') {
        if (!day.prevMonth && !day.nextMonth) {
          this.calendarView = 'day';
          this.selectedDate = new Date(this.currentYear, this.currentMonth, day.date);
        }
      } else if (this.calendarView === 'week') {
        this.calendarView = 'day';
        const firstDayOfWeek = this.getWeekStartDate(this.currentDate);
        const selectedDate = new Date(firstDayOfWeek);
        selectedDate.setDate(selectedDate.getDate() + day.date - 1);
        this.selectedDate = selectedDate;
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('ko-KR', options);
    },
    getWeekStartDate(date) {
      const dayOfWeek = date.getDay();
      const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const weekStart = new Date(date);
      weekStart.setDate(diff);
      return weekStart;
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    addEvent() {
      this.closeDialog();
    },
  },
};
</script>

<style>
.calendar {
  width: 600px;
  height: 640px;
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}

.week {
  display: flex;
}

.day {
  flex: 1;
  border: 1px solid #ccc;
  padding: 30px;
  text-align: center;
  cursor: pointer;
}

.day-header {
  background-color: #eee;
  font-weight: bold;
}

.day-prev-month {
  color: #ccc;
}

.day-current-month {
  color: #333;
}

.day-next-month {
  color: #ccc;
}

.day-selected {
  background-color: #ccc;
  color: #fff;
}

.dropdown {
  margin-bottom: 10px;
  position: relative;
}

.dropdown-label {
  display: inline-block;
  margin-right: 10px;
}

.dropdown-select {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  width: 200px;
  max-width: 100%;
}

.dropdown-select:focus {
  outline: none;
  border-color: #999;
}

.dropdown-select option {
  font-size: 14px;
}

.dropdown::after {
  display: none;
}

.event {
  margin-bottom: 10px;
}

.event-date {
  font-weight: bold;
}

.event-description {
  font-style: italic;
}

.btn {
  padding: 8px 16px;
  margin-left: 10px;
  margin-bottom: 10px;
  background-color: #0d782a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(218, 239, 221, 0.708);
  z-index: 9999;
}

.dialog-container {
    top: 50%;
    left: 50%;
    transform: translate(200%, 30%);
    max-width: 400px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 4px;
    z-index: 10000;
  }

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog-content label {
  margin-top: 10px;
}

.dialog-content input,
.dialog-content textarea {
  width: 300px;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dialog-content button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>