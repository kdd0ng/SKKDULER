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
          <label for="event-title">제목:</label>
          <input id="event-title" v-model="newEvent.title" type="text">
          <label for="event-description">설명:</label>
          <textarea id="event-description" v-model="newEvent.description"></textarea>
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
            <div class="event-date">{{ formatDate(selectedDate) }}</div>
          </div>
          <div>
            <h2>예정된 공지사항</h2>
              <ul>
                <li v-for= "notification in event.notification_event" :key="notification.id" v-if="notification.date.toDateString() === selectedDate.toDateString()">
                  <div>제목: {{ notification.title }}</div>
                  <div>장소: {{ notification.location }}</div>
                  <div>날짜: {{ notification.date }}</div>
                  <div>URL: {{ notification.url }}</div>
                </li>
              </ul>
            <h2>예정된 주최일정</h2>
              <ul>
                <li v-for= "hosted in event.hosted_event" :key="hosted.id" v-if="hosted.date.toDateString() === selectedDate.toDateString()">
                </li>
              </ul>
            <h2>예정된 개인일정</h2>
              <ul>
                <li v-for= "personal in event.personal_event" :key="personal.id" v-if="personal.date.toDateString() === selectedDate.toDateString()">
                  <div>설명: {{ personal.memo }}</div>
                  <div>장소: {{ personal.location }}</div>
                  <div>시작날짜: {{ personal.startdate }}</div>
                </li>
              </ul>
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
      calendarView: 'month', selectedDate: null,
      dialog: false,
      toggleValue: false,
      toggleLabel: '공개',
      event: {
        notification_event: [],
        hosted_event: [],
        personal_event: []},
      newEvent: {
        title: '새 일정',
        description: '',
        startdate: '',
        enddate: '',
        location: ''
      },
      events: [
        {
          title: '중요한 일정',
          description: '오늘은 중요한 일정이 있습니다.',
          startdate: '2023-02-01',
          location: '국제관'
        },
        {
          title: '회의',
          description: '회의가 있습니다.',
          startdate: '2023-02-10',
          location: '호암관'
        }
      ]
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
    getEventTitle(date) {
    return events[date.toLocaleDateString('ko-KR', options)] || '오늘은 등록된 일정이 없습니다. 새로운 일정을 등록하세요!';
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
      this.title = '';
      this.description = '';
      this.startdate = '';
      this.enddate = '';
      this.location = '';
    },
    addEvent() {
      //events[this.date] = { title: this.title, description: this.description, startdate: this.startdate, enddate: this.enddate, location: this.location };
      this.closeDialog();
    },

    fetchCalendarItem() {
        const data = {
          id: this.studentid,
        };
        fetch(
          `http://localhost:8000/api/calender/get_all?id=${this.studentid}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.event.notification_event = data.notification_list.map((notification) => {
              return {
                id: notification.id,
                title: notification.title,
                location: notification.location,
                date: notification.date,
                url: notification.url
              };
            });
            this.event.hosted_event = data.hosted_list.map((hosted) => {
              return {
                id: hosted.id,
              };
            });
            this.event.personal_event = data.personal_list.map((personal) => {
              return {
                id: personal.id,
                location: personal.location,
                end_date: personal.end_date,
                start_date: personal.start_date,
                memo: personal.memo,
              };
            });
          })
          .catch((error) => {
            console.error(error);
          });
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
    background-color: rgba(219, 239, 218, 0.708);
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