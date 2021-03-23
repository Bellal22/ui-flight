<template>
    <v-container>
      <!-- snack bars -->
      <v-snackbar
      v-model="snackbar"
    >{{ respond_message }}
    </v-snackbar>
      <!--  -->
        <h2 class="pa-4">Create a new flight</h2>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
        <v-row class="white" elevation="3">
        <v-col cols="12" md="5">
          <v-autocomplete
            v-model="flight.aeroplane_id"
            :items="aeroplanes"
            item-text="model"
            item-value="id"
            @change="seats_number"
            dense
            filled
            label="Aeroplane Type"
            :rules="fieldRules"
          ></v-autocomplete>
        </v-col>
        <v-col class="pt-5" cols="12" md="7">{{seats_no}} Seats</v-col>
        <v-col cols="12" md="5">
          <v-autocomplete
            v-model="flight.origin"
            :items="airlines"
            item-text="country"
            item-value="country"
            dense
            filled
            label="Origin"
            :rules="fieldRules"
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
            :items="airlines"
            item-text="country"
            item-value="country"
            dense
            filled
            label="Destination"
            :rules="fieldRules"
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="prices.a"
            label="price for First Class"
            prepend-icon="mdi-currency-usd"
            :rules="priceRules"
            required
            
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="prices.b"
            label="price for Businiess Class"
            prepend-icon="mdi-currency-usd"
            :rules="priceRules"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="prices.c"
            label="price for Economy Class"
            prepend-icon="mdi-currency-usd"
            :rules="priceRules"
            required
            
          ></v-text-field>
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
        @click="validate"
        :disabled="!valid"
        >
            Add Flight
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
    </v-container>
</template>
<script>

export default {
    data: () => ({
        valid: false,
        snackbar:false,
        respond_message:'',
        airlines: [],
        aeroplanes:[],
        seats_no: 0 ,
        flight:{
            origin:'',
            dist:'',
            aeroplane_id:'',
        },
        
        fieldRules: [
        v => !!v || 'this field is required',
      ],
      priceRules: [
        v => !!v || 'this field is required',
        v => Number.isInteger(Number(v)) &&  Number(v) > 0|| "The value must be an integer number"
      ],
        prices:{
            a:'',
            b:'',
            c:''
        }
    }),
    watch: {
        
    },
    created() {
        this.set_airlines();
        this.fetch_aeroplanes();
    },

    methods:{
      validate(){
        if(this.$refs.form.validate()){
          this.addFlight();
        }
      },
        set_airlines(){
            var airlines_json = require('airline-codes/airlines.json');
            airlines_json.forEach(element => {
                this.airlines.push(element.country + ' - ' + element.name);
            });
        },
        fetch_aeroplanes(){
            this.$http.plain.get('/aeroplane')
            .then(response => this.aeroplanes = response.data)
            .catch(error => console.log(error))
        },
        seats_number(){
            this.seats_no = this.aeroplanes.find(x => x.id === this.flight.aeroplane_id).seats_no
        },
        addFlight () {
            this.$http.plain.post('/flights', { flight: this.flight , prices: this.prices })
            .then(response => this.addFlightSuccessful(response))
            .catch(error => this.addFlightFailed(error))
        },
        addFlightSuccessful (response) {
            this.respond_message = response.data.message; 
            this.$refs.form.resetValidation();
            this.$refs.form.reset();
            this.snackbar = true;   
        },
        addFlightFailed (error) {
            this.respond_message = error.message; 
            this.snackbar = true; 
        }
    }
}
</script>
