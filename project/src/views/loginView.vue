<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
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
        ></v-text-field>

        <br>

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
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      form: false,
      studentid: null,
      password: null,
      loading: false,
    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => {
            this.loading = false;
            this.$root.$data.studentid = this.studentid;
            this.$router.push('/');
        }, 2000);
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
</script>