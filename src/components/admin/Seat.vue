<template>
    <v-container>
      <!-- snack bars -->
      <v-snackbar
      v-model="snackbar"
    >{{ respond_message }}
    </v-snackbar>
      <!--  -->
        <h2 class="pa-4">Update Seats prices</h2>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
        <v-row class="white" elevation="3">
        <v-col cols="12" md="5">
          <v-autocomplete
            v-model="flight.origin"
            :items="origins"
            item-text="country"
            item-value="country"
            dense
            filled
            label="Origin"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="2">
            <v-icon
                mini
                class="pt-5"
                color="blue-grey darken-2"
                >
                 mdi-arrow-right-bold
            </v-icon>
        </v-col>
        <v-col cols="12" md="5">
          <v-autocomplete
            v-model="flight.dist"
            :items="dists"
            item-text="country"
            item-value="country"
            dense
            filled
            label="Destination"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="5">
          <v-autocomplete
            v-model="flight.aeroplane_id"
            :items="aeroplanes"
            item-text="model"
            item-value="id"
            dense
            filled
            label="Aeroplane Type"
          ></v-autocomplete>
        </v-col>
        
        <!-- submit -->
        <v-col
          md="12"
        cols="12"
        />
        <v-col
          md="12"
           cols="12"
        >
        <v-btn
        depressed
        color="primary"
        @click="fetchSeats"
        >
            Get Seats
            <v-icon right dark
            >mdi-airplane</v-icon>
        </v-btn>
        </v-col>
        <v-col
          md="12"
           cols="12"
        />
        </v-row>
        </v-form>
        <v-row class="gery" elevation="3">
            <v-col
            md="12"
            cols="12"
        />
        </v-row>
        <!-- <v-row class="white" elevation="3"> -->
        <div id="seats" >
            <view-seat
                v-if="seats.length > 0"
                :key="componentKey"
                v-bind:rows ="rows"
                v-bind:cols ="cols"
                v-bind:seats="seats"
                @changeSeats="changeSeats"
            ></view-seat>
            
        </div>
    </v-container>
</template>
<script>
import viewSeat from "../admin/ViewSeat";
export default {
    components: {
        viewSeat
    },
    data: () => ({
        valid: true,
        snackbar:false,
        respond_message:'',
        componentKey:0,
        seats:[],
        rows:[],
        cols:[],
        origins: [],
        dists: [],
        aeroplanes:[],
        seats_no: 0 ,
        flight:{
            origin:'',
            dist:'',
            aeroplane_id:'',
        },
    }),
    watch: {
        
    },
    created() {
        this.set_flights();
        this.fetch_aeroplanes();
    },

    methods:{
        changeSeats(value){
            console.log(value);
            this.seats = value ; 
            this.componentKey +=1;
        },
        set_flights(){
            this.$http.plain.get('/flights')
            .then((response) => {
                console.log(response);
                response.data.forEach(element => {
                    this.origins.push(element.origin);
                    this.dists.push(element.dist);
                });
            })
            .catch(error => console.log(error))
        },
        fetch_aeroplanes(){
            this.$http.plain.get('/aeroplane')
            .then(response => this.aeroplanes = response.data)
            .catch(error => console.log(error))
        },
        fetchSeats () {
            this.$http.plain.get(`/seats?origin=${this.flight.origin}&dist=${this.flight.dist}&aeroplane_id=${this.flight.aeroplane_id}`)
            .then(response => this.fetchSeatsSuccessful(response))
            .catch(error => this.fetchSeatsFailed(error))
        },
        fetchSeatsSuccessful (response) {
            
            response.data.categories.forEach(element => {
                this.rows.push(element.rows)
                this.cols.push(element.cols)
            });
            this.seats = response.data.seats;
            this.componentKey +=1;
            
        },
        fetchSeatsFailed (error) {
            this.respond_message = "Something Wrong happen, please try again"; 
            this.snackbar = true; 
        },
        
}
}
</script>
