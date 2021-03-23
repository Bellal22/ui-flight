<template>
    <v-container >       
        <v-row v-for="row in rows[0]" :key="row">
            <v-col v-for="col in cols[0]" :key="col">
                <v-chip :disabled="seats[counter].booked == 1"
                 v-bind:id="seats[counter].id"
                  @click="change_seat($event)"
                   :class="(seats[counter].pnr == flight.pnr) ? 'red' : 'blue-grey lighten-3'">
                   <small v-if="seats[counter].pnr == flight.pnr">yours</small>
                    {{seats[counter++].price}}$ <br>
                </v-chip>
            </v-col>
        </v-row>
        <v-row v-for="row in rows[1]" :key="row">
            <v-col v-for="col in cols[1]" :key="col">
                <v-chip :disabled="seats[counter].booked == 1"
                 v-bind:id="seats[counter].id"
                  @click="change_seat($event)"
                  :class="(seats[counter].pnr == flight.pnr) ? 'red' : 'blue-grey lighten-4'"
                   >
                    <small v-if="seats[counter].pnr == flight.pnr">yours</small>
                     {{seats[counter++].price}}$ 
                </v-chip>
            </v-col>
        </v-row>
        <v-row v-for="row in rows[2]" :key="row">
            <v-col v-for="col in cols[2]" :key="col">
                <v-chip :disabled="seats[counter].booked == 1" 
                v-bind:id="seats[counter].id"
                 @click="change_seat($event)" 
                 :class="(seats[counter].pnr == flight.pnr) ? 'red' : 'blue-grey lighten-5'">
                 <small v-if="seats[counter].pnr == flight.pnr">yours</small>
                     {{seats[counter++].price}}$
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
        flight: Object,
    },

    data: () => ({
        counter: 0,
        componentKey: 0,
        dialog:false,
        bill:false
    }),
    created: function () {
        
  },
  methods:{
      change_seat(event){
          
          if(confirm(`Are you sure ? this change may cost you addition taxes.`)){
              this.validate_change(event.currentTarget.id)
          }
      },
      validate_change(id){
        let counter = 0;
        this.seats.forEach((el,i) => {
            if(el.booked == 1) {
                counter++
            };
        });
        let booked_percentage = (counter / Object.keys(this.seats).length) * 100 ; 
        if(booked_percentage >= 50){
            this.flight.tax = this.flight.price * (10/100);
        }
        this.submit_change(id);

      },
      submit_change(id){
          console.log(this.flight);
        this.$http.plain.put(`/change-seat`, {old_id: this.flight.seat_id,new_id: id})
        .then(response => {
            console.log(response.data)
            this.flight.pnr = response.data.pnr
            this.flight.price = response.data.price
            this.flight.seat_id = response.data.id
            this.changeFlight();
        })
        .catch(error => console.log(error))
        this.dialog = false;
      },
      changeFlight () {
      this.$emit('changeFlight', this.flight);
    }

  }

}
</script>