// store.js

import Vue from 'vue';
import Vuex from 'vuex';
import { requestAddEvent } from './api'; // API 요청 함수 임포트

Vue.use(Vuex);

const state = {
    event: initEvent(),
    events: [],
    dialog: false,
};

function initEvent(){
    return {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        content: '',
        title: '',
    }
}

const actions = {
    async REQUEST_ADD_EVENT(context, calendar) {
        try {
            const response = await requestAddEvent(calendar);

            const addedEvent = makeEvent(response.data);
            context.commit('ADD_EVENT', addedEvent);
            store.commit('SET_SNACKBAR', setSnackBarInfo('일정이 추가 되었습니다.', 'info', 'top'))
        } catch (e) {
            console.log('일정 추가 에러' + e);
        }
    },
  }

const colors = ['blue', 'indigo', 'deep-purple', 'green', 'orange', 'red'];


const makeEvent = (event) => {
    return {
        name: event.title,
        start: event.startDate + getTime(event.startTime),
        end: event.endDate + getTime(event.endTime),
        color: colors[Math.floor(Math.random() * 6)]
    }
};

const mutations = {
    ADD_EVENT(state, getEvent) {
        state.events.push(getEvent);
        state.dialog = false;
        state.event = initEvent();
    }
};

