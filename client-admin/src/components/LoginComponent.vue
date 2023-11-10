<script>
import ButtonComponent from './ButtonComponent.vue';
export default {
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
		methods: {
    callback(response) {
      // console.log(response);
      this.$emit('googleLogin', response.credential)
      //   this.log = response
    }
	},
}
</script>

<template>
  <div class="login-form-bg h-100 mt-5">
    <div class="container h-100">
      <div class="row justify-content-center h-100">
        <div class="col-xl-6">
          <div class="form-input-content">
            <div class="card login-form mb-0">
              <div class="card-body pt-5">
                <a class="text-center">
                  <h4>Login</h4>
                </a>

                <form class="mt-5 mb-5 login-input" v-on:submit.prevent="$emit('doLogin', login)">
                  <div class="form-group">
                    <input
                      type="email"
                      v-model="login.email"
                      class="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="login.password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <!-- <ButtonComponent class="btn login-form__btn submit w-100" :btnValue="'Sign In'"/> -->
                  <button class="btn login-form__btn submit w-100">Sign In</button>

                </form>
                <div style="display: flex; justify-content: center">
                  <GoogleLogin :callback="callback"/>
                </div>
                <hr />
                <p class="mt-5 login-form__footer">
                  Dont have account?
                  <a href="" @click.prevent="$emit('changePage', 'register')" class="text-primary"
                    >Sign Up</a
                  >
                  now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
