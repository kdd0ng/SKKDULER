import { createStore, mapState } from "vuex";

export default createStore({
  state: {
    studentId: null,
  },
  mutations: {
    setStudentId(state, studentId) {
      state.studentId = studentId;
    },
  },
  getters: {
    ...mapState(["studentId"]),
  },
});
