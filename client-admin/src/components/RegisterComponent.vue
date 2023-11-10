<script>
export default {
  data(){
    return{
      register: {
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        address: ''
      }
    }
  }
}
</script>

<template>
  <div class="login-form-bg h-100">
    <div class="container h-100">
      <div class="row justify-content-center h-100">
        <div class="col-xl-6">
          <div class="form-input-content">
            <div class="card login-form mb-0">
              <div class="card-body pt-5">
               
                  <h4>Register</h4>

                <form class="mt-5 mb-5 login-input" v-on:submit.prevent="$emit('doRegister',register)">
                  <div class="form-group">
                    <input type="text" v-model="register.username" class="form-control" placeholder="Name" required />
                  </div>
                  <div class="form-group">
                    <input type="email" v-model="register.email" class="form-control" placeholder="Email" required />
                  </div>
                  <div class="form-group">
                    <input type="password" v-model="register.password" class="form-control" placeholder="Password" required />
                  </div>
                  <div class="form-group">
                    <input type="number" v-model="register.phoneNumber" class="form-control" placeholder="Phone Number" required />
                  </div>
                  <div class="form-group">
                    <input type="text" v-model="register.address" class="form-control" placeholder="Address" required />
                  </div>
                  <button class="btn login-form__btn submit w-100">Sign in</button>
                </form>
                <p class="mt-5 login-form__footer">
                  Have account <a href="" @click.prevent="$emit('changePage','login')" class="text-primary">Sign Up </a> now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
