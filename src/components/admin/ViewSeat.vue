<template>
    <v-container>       
        <v-row v-for="row in rows[0]" :key="row">
            <v-col v-for="col in cols[0]" :key="col">
                <v-chip v-bind:id="seats[counter].id" @click="change_price($event)" class="lime lighten-3">
                    price:{{seats[counter++].price}} <br>
                    
                </v-chip>
            </v-col>
        </v-row>
        <v-row v-for="row in rows[1]" :key="row">
            <v-col v-for="col in cols[1]" :key="col">
                <v-chip v-bind:id="seats[counter].id" @click="change_price($event)" class="orange lighten-3">
                    price: {{seats[counter++].price}} 
                </v-chip>
            </v-col>
        </v-row>
        <v-row v-for="row in rows[2]" :key="row">
            <v-col v-for="col in cols[2]" :key="col">
                <v-chip v-bind:id="seats[counter].id" @click="change_price($event)" class="blue-grey lighten-3">
                    price: {{seats[counter++].price}}
                </v-chip>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default { 
    props: {
        rows: Array,
        cols: Array,
        seats: Array,
    },

    data: () => ({
        counter: 0,
        componentKey: 0,
        dialog:false
    }),
    created: function () {
        
  },
  methods:{
      change_price(event){
          let id = event.currentTarget.id;
          let price = prompt("Please enter the new price");
          if(price) this.submit_price(id,price);
        
      },
      submit_price(id , price){
          this.$http.plain.put(`/seats/${id}`, {price: price})
        .then(response => {
            this.seats.forEach((el,i) => {
                if(el.id == id) {
                    console.log(el.id);
                    this.seats[i].price = price};
            });
            this.changeSeats();
        })
        .catch(error => console.log(error))
        this.dialog = false;
      },
      changeSeats () {
      this.$emit('changeSeats', this.seats);
    }

  }

}
</script>