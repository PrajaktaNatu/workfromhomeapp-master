<template>
    <div>
        <h1>Page displayed for other users</h1>

        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <button type="button" v-on:click="logout()">Logout</button>
            <router-link :to="{ name: 'CreateItem' }" class="btn btn-primary" :disabled="!quotaFull">Create WFH Request</router-link>
            <button v-on:click="calcReqs">Count requests in a month</button>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
                <td>Reason</td>
                <td>Applying for Date</td>
                <td>Status</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items">
                    <td>{{ item.reason }}</td>
                    <td>{{ item.example_date | formatDate }}</td>
                    <td>{{ item.reqStatus }}</td>
                    <td><router-link :to="{name: 'EditItem', params: { id: item._id }}" class="btn btn-primary" v-if="item.reqStatus === 'Pending'">Edit</router-link></td>
                    <td><button class="btn btn-danger" v-on:click="deleteItem(item._id)" v-if="item.reqStatus === 'Pending'">Cancel</button></td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import moment from 'moment'

    export default {
        data(){
            var flag = true;
            return{
                items: []
            };
        },

      created: function()
        {
            this.fetchItems();

        },

        computed: {

        },

        methods: {
            fetchItems()
            {
              let uri = 'http://localhost:4000/items';
              this.axios.get(uri).then((response) => {
                  this.items = response.data;
              });
              console.log("hello");
            },

            calcReqs: function(){
                var dates=[];
                var count = 0;

                this.items.forEach(function(value){
                  dates.push(new Date(value.example_date));
                });
                dates.forEach(function(i){
                    if((i.getMonth()) == moment().month()){
                        count ++;
                    }
                });
                console.log(count + " requests submitted for month " + (moment().month() + 1));
            },

            quotaFull: function(){
              return this.flag;
            },

            deleteItem(id)
            {
                let uri = 'http://localhost:4000/items/cancel/' + id;
                this.axios.post(uri, this.item).then((response) => {
                this.fetchItems();
              });
            },
            logout() {
                let uri = 'http://localhost:4000/user/logout';
//                console.log(this.user.email);
                this.axios.get(uri, this.user).then((response) => {
                this.$router.push({name: 'logout'})
                })
        }
        },

        filters : {
          formatDate: function(value){
            if (value) {
              return moment(String(value)).format('DD-MM-YYYY')
              }
          }
      }
    }
</script>
