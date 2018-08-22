<template>
  <div>
    <h1>New WFH Request</h1>
    <form v-on:submit.prevent="addItem">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="item.name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Reason:</label>
              <input type="text" class="form-control col-md-6" v-model="item.reason" />
            </div>
          </div>
        </div><br />
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Date example:</label>
              <datepicker placeholder="Select Date" v-model="item.example_date" @closed="formatDate()" :disabledDates="disabledDates"></datepicker>
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Submit</button>
          <button class="btn btn-primary" v-on:click="sendMail">Send Mail</button>
        </div>
    </form>
  </div>
</template>
<script>

import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import moment from 'moment'

  export default {

    components: {
      Datepicker
    },


    data(){
        return{
          disabledDates: {
          //    to: new Date()
          to: new Date(new Date().getTime()+(2*24*60*60*1000))
          },
          item:{},
        }
    },
    methods: {
      formatDate: function() {
            console.log(this.item.example_date);
            var dateString = this.item.example_date;
            var dateObj = new Date(dateString);
            var momentObj = moment(dateObj);
            this.item.example_date = momentObj.format('YYYY-MM-DD');
            console.log("Now date is: " + this.item.example_date);
      },
      addItem(){
        let uri = 'http://localhost:4000/items/add';
        this.axios.post(uri, this.item).then((response) => {
          this.$router.push({name: 'DisplayItem'})
        })
    },
    sendMail(){
    //    console.log("printing from sendmail" + this.item.name);
      //  var formData = JSON.stringify(this.item);
        //console.log("Form Data ==> " + formData);
        this.axios.post("http://localhost:4000/items/sendMail",this.item).then((res) => {
          this.$router.push({name: 'DisplayItem'})
        })//end of post
      }//end of sendmail
    }//end of methods

}
</script>
