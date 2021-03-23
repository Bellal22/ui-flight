<template>
<v-card
    :loading="loading"
    class="mx-auto "
    max-width="344"
>
    <template slot="progress">
    <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
    ></v-progress-linear>
    </template>


    <v-card-title>Bill</v-card-title>

    <v-card-text>
    <v-row
        
        class="mx-0"
    >
        <v-rating
        :value="3.5"
        color="amber"
        dense
        half-increments
        readonly
        size="14"
        ></v-rating>

        <div class="grey--text ml-4">
        3.5 (413)
        </div>
    </v-row>

    <div class="my-2 subtitle-1">
        {{flight.dist}}
    </div>

    <div>Thanks for using "Flight System"</div>
    </v-card-text>

    

    <v-card-title >Your Billing Information</v-card-title>
        <small><strong>fullname:</strong> {{flight.fullname}}</small><br>
        <small><strong>from:</strong> {{flight.origin}}</small><br>
        <small><strong>to:</strong> {{flight.dist}}</small><br>
        <small><strong>Your ticket category is:</strong> {{flight.class_name}}</small><br>
        <small><strong>Flight price:</strong> {{flight.price}}$ </small> <br>
        <small><strong>choose seat (Tax 10%):</strong> {{flight.tax}}$</small> <br>
        <strong v-if="flight.seat_id == ''" class="red">sorry, all seats are reserved</strong>
    <v-card-actions>
    <v-btn
    color="success"
    @click="submit"
    :disabled="flight.seat_id == ''"
    >
        checkout
    </v-btn>
    </v-card-actions>
</v-card>
</template>
<script>
export default { 
    props: {
        flight: Object,
    },

    data: () => ({
        loading:false,
    }),
    created: function () {
        this.fetchSeats();
  },
  methods:{
      submit(){
          let booking = this.flight;
          booking.paid = 1 ; 
          this.$http.plain.post(`/bookings`, {booking: booking})
        .then(response => {
            swal({
                title: "Happy Trip!",
                text: `Your PNR Code is ${this.flight.pnr}`,
                icon: "success",
                });
        })
        .catch(error => console.log(error))
      },
      fetchSeats() {
            this.$http.plain.get(`/seats?origin=${this.flight.origin}&dist=${this.flight.dist}&aeroplane_id=${this.flight.aeroplane_id}`)
            .then(response => this.fetchSeatsSuccessful(response))
            .catch(error => this.fetchSeatsFailed(error))
        },
        fetchSeatsSuccessful (response) {
            response.data.categories.forEach(element => {
                if(element.name == this.flight.class_name){
                    response.data.seats.forEach(seat => {
                        if(seat.category_id == element.id){
                            
                            if(seat.booked !== 1){
                                this.flight.seat_id = seat.id;
                                this.flight.pnr = seat.pnr;
                                this.flight.category_id = seat.category_id;
                                this.flight.price = seat.price;
                            }
                        }
                    });
                }
            });
        },
      

  }

}
</script>
                    
                