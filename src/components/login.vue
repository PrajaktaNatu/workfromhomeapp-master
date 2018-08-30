<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="email" v-model="user.email" placeholder="Email" />
        <input type="password" name="password" v-model="user.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
        <button type="button" v-on:click="signup()">Sign Up</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                user: {}
            }
        },
        methods: {
            login() {
                let uri = 'http://localhost:4000/user/signin';
                this.axios.post(uri, this.user).then((response) => {
                    localStorage.setItem('email',JSON.stringify(response.data.email))
                    localStorage.setItem('jwt',response.data.token)
                    if(this.user.email !== 'admin')
                      this.$router.push({name: 'DisplayItem'})
                    else
                      this.$router.push({name: 'Approve'})
                })
        },
             // end of login method

             signup(){
                      let uri = 'http://localhost:4000/user/signup';
                      this.axios.post(uri, this.user).then((response) => {
                        //this.$router.push({name: 'DisplayItem'})
                          console.log("user added")
                      })
              }
    }  // end of methods
} // end of export-default
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
