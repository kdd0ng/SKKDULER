<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="studentid"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Student id"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
          type="password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>

        <div class="text-button">
          <v-btn text color="info" @click="dialog = true">Registration</v-btn>
          <v-btn text color="warning" @click="onForgot">Forgot ID/PW</v-btn>
        </div>
      </v-form>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Registration</v-card-title>
          <v-card-text>
            <v-form v-model="registrationForm" @submit.prevent="onRegister">
              <v-text-field
                v-model="registerName"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerId"
                label="ID"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerPassword"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <!-- <v-text-field
                v-model="registerPasswordConfirm"
                label="Confirm Password"
                type="password"
                required
              ></v-text-field> -->
              <v-spacer></v-spacer>
              <!-- <v-btn
                class="mr-3"
                color="blue darken-1"
                text
                @click="dialog = false"
                >닫기</v-btn
              > -->
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text type="submit">등록</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  props: ["studentidProp"],
  data: () => ({
    form: false,
    studentid: null,
    password: null,
    loading: false,
    dialog: false,
    registerId: "",
    registerPassword: "",
    registerPasswordConfirm: "",
    registrationForm: false,
  }),

  watch: {
    studentidProp: {
      immediate: true,
      handler(newStudentId) {
        this.studentid = newStudentId;
      },
    },
  },

  methods: {
    updateStudentId(sid) {
      this.$emit("update-studentid", sid);
    },
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.$root.$data.studentid = this.studentid;
        this.$router.push("/");
      }, 2000);
    },

    onRegister() {
      if (!this.registrationForm) return;

      const data = {
        name: this.registerName,
        id: this.registerId,
        password: this.registerPassword,
      };

      fetch(
        `http://localhost:8000/api/sign_login/signin?name=${this.registerName}&id=${this.registerId}&password=${this.registerPassword}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.dialog = false;
          this.registerName = "";
          this.registerId = "";
          this.registerPassword = "";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    onForgot() {
      // Forgot ID/PW logic here
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>

<style>
.text-button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
