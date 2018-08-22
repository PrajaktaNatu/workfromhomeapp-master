<template>
    <div>
        <h1>Approve Request</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2"><router-link :to="{ name: 'DisplayItem' }" class="btn btn-success">Return to Requests</router-link></div>
        </div>

        <form v-on:submit.prevent="approveReq">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="item.name" :readonly="readonly">
            </div>

            <div class="form-group">
                <label name="Reason">Reason</label>
                <input type="text" class="form-control" v-model="item.reason" :readonly="readonly">
            </div>

            <div class="form-group">
                <label name="ApproverComments">Approver Comments</label>
                <input type="text" class="form-control" v-model="item.ApproverComments" required>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Approve</button>
            </div>
        </form>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                readonly : true,
                item:{}
            }
        },

        created: function(){
            this.getItem();
        },

        methods: {
            getItem()
            {
              let uri = 'http://localhost:4000/items/edit/' + this.$route.params.id;
                this.axios.get(uri).then((response) => {
                    this.item = response.data;
                });
            },

            approveReq()
            {
              let uri = 'http://localhost:4000/items/approve/' + this.$route.params.id;
                this.axios.post(uri, this.item).then((response) => {
                  this.$router.push({name: 'DisplayItem'});
                });
            }
        }
    }
</script>
