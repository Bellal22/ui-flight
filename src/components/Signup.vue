<template>
  <form class="form-signup" @submit.prevent="signup">
    <div class="alert alert-info" v-if="error">{{ error }}</div>
    <div class="form-group">
      <label for="email">Email address</label>
      <input v-model="email" type="email" class="form-control" id="email" placeholder="email@example.com">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
    </div>
    <div class="form-group">
      <label for="password">Password Confirmation</label>
      <input v-model="password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Password Confirmation">
    </div>
    <button type="submit" class="btn btn-primary mb-3"> Add Admin</button>
  </form>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    // this.checkSignedIn()
  },
  updated () {
    // this.checkSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      // localStorage.csrf = response.data.csrf
      // localStorage.signedIn = true
      this.email='';
      this.password='';
      this.password_confirmation='';
      this.error = 'Admin Added Succesfully'
      // this.$router.go(this.$router.currentRoute)
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/aeroplanes')
      }
    }
  }
}
</script>

<style lang="css">
.form-signup {
  width: 70%;
  max-width: 500px;
  padding: 10% 15px;
  margin: 0 auto;
}
</style>
