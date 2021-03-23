<template>
  <v-app light>
    <v-toolbar class="white">
     <!-- <v-toolbar-side-icon><img :src="imageLink.logo" alt="Vuetify.js" height="50%"></v-toolbar-side-icon> -->
      <v-toolbar-title class="mx-0" v-text="title">Flights System</v-toolbar-title>
      <p>Beta</p>
      <v-spacer></v-spacer>
      <v-toolbar-items>
            <v-btn text class="grey lighten-3" to="/signin" >Sign In</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax :src="imageLink.sub_main" height="600">
            <v-container>
                <v-row >
                <v-col  md="8" cols="12">
                    <div class="blue-grey pa-5">
                    <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 900; ">Choose your travel</h1>
                    <v-alert
                        v-if="no_flight"
                        text
                        prominent
                        type="error"
                        icon="mdi-cloud-alert"
                    > {{no_flight}}
                    </v-alert>
                    <v-row>
                        <v-col cols="12" md="5">
                        <v-autocomplete
                            v-model="flight.origin"
                            :items="origins"
                            item-text="country"
                            item-value="country"
                            label="Origin"
                            :rules="fieldRules"
                            hide-details
                            hide-selected
                            solo
                            chips
                            clearable
                        ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-icon
                                mini
                                class="pt-2 "
                                color="white darken-2"
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
                            label="Destination"
                            :rules="fieldRules"
                            hide-details
                            hide-selected
                            solo
                            chips
                            clearable
                        ></v-autocomplete>
                        </v-col>
                    
                        <v-col cols="12" md="5">
                            <v-select
                                v-model="flight.class_name"
                                :items="classes"
                                label="Ticket Class"
                                solo
                                item-text="name"
                                item-value="value"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="2"/>
                        <v-col cols="12" md="5">
                            <v-text-field v-model="flight.fullname" label="Full name" solo></v-text-field>
                        </v-col>
                            
                        <v-col >
                            <v-btn class="primary " @click="check_bill"  large>
                                View Bill
                            </v-btn>
                        </v-col>
                    </v-row>
                    </div>
                    </v-col>
                <v-col md="1"/>
                <v-col md="3" v-if="bill">
                    <bill
                    :flight="flight"
                    @changeFlight="changeFlight"
                    />
                </v-col>
            </v-row>
            </v-container>
            
          <!-- <v-layout column align-center justify-center class="white--text">
            
          </v-layout> -->
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to go amazing Places</h2>
              <span class="subheading">
                No more restrictions, no more limits
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">public</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Reach the world</div>
                    </v-card-title>
                    <v-card-text>
                      Show your stuff to the whole community of flight system not only to your mum or your friends. We love making good content viral. In this moment flight system is used by artists who are not famous but that want to share their works to the world. Unfortunately with other Flight mangement this is hard, slow and sometime expensive.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast feedback</div>
                    </v-card-title>
                    <v-card-text>
                      Time is important, we don't want you to waste it. Here you can get a massive feedback from real users in minutes. And if your stuff is appreciated you won't only get positive feedback but also lovely and sincere fans <3 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">share</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Create new connections</div>
                    </v-card-title>
                    <v-card-text>
                      Imagine if you can directly speak with the world's population. Don't you think it would be easier to find nice people to interact with? flight system is both local and global and help you to connect without limitations with people from your city, your state and your universe! 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="imageLink.main" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">flight system is a Travelling App that allows everyone to reach a huge audience with a tap </div>
            <em>With the power of flight system you don't need to be famous or post pics of cute cats in order to get visibility</em>
            <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
              Get more info
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

       <section>
        <v-container grid-list-md>
           <div class="headline pa-5">Change Your Seat .!</div>
           <v-dialog
            v-model="dialog"
            width="700"
            >
            <change-seat
            v-if="seats.length > 0"
                v-bind:flight="flight"
                v-bind:rows ="rows"
                v-bind:cols ="cols"
                v-bind:seats="seats"
                v-bind:user="true"
               @changeFlight="changeFlight"
            />
            </v-dialog>
            <v-row >
                <v-col  md="8" cols="12">
                    <div class="blue-grey pa-5">
                    <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 900; ">Choose your travel</h1>
                    <v-alert
                        v-if="no_flight"
                        text
                        prominent
                        type="error"
                        icon="mdi-cloud-alert"
                    > {{no_flight}}
                    </v-alert>
                    <v-row>
                        <v-col cols="12" md="5">
                            <v-text-field
                                v-model="flight.fullname"
                                label="Full name"
                                solo
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2"/>
                        <v-col cols="12" md="5">
                            <v-text-field v-model="flight.pnr" label="PNR" solo></v-text-field>
                        </v-col>
                            
                        <v-col >
                            <v-btn class="primary " @click="fetchSeats"  large>
                                change seat
                            </v-btn>
                        </v-col>
                    </v-row>
                    </div>
                    </v-col>
                <v-col md="1"/>
                <v-col md="3" v-if="bill">
                    <bill
                    :flight="flight"
                    />
                </v-col>
            </v-row>
          </v-container>
      </section>

       <section>
        <v-parallax :src="imageLink.social_cover" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">We are dropping cool news and opportunities on socials</div>
          </v-layout>
          <v-layout justify-space-around justify-center>

              <v-icon x-large dark>fab fa-facebook-f</v-icon>

              <v-icon x-large dark>fab fa-twitter</v-icon>

              <v-icon x-large dark>fab fa-reddit-alien</v-icon>

              <v-icon x-large dark>fab fa-instagram</v-icon>

              <v-icon x-large dark>fab fa-discord</v-icon>
            </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  We are not a company. We hate companies. Just imagine us like the guys from the Silicon Valley series. 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">We are hiring</div>
                </v-card-title>
                <v-card-text>
                  Are you a creative person? Do you like techy stuff? Complete the email form by writing your skills and interests
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

       <section>
        <v-container>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
                <img height="200px" :src="imageLink.logo">
            </v-flex>
          </v-layout>
        </v-container>
     </section>

    


      <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12 class="text-xs-center">
            
          </v-flex>
        </v-layout>
      </v-footer>

    </v-content>
</v-app>
</template>

<script>
import Bill from "../components/Bill";
import ChangeSeat from "../components/ChangeSeat";
export default {
  name: "App",
  components: {
    Bill,
    ChangeSeat
},
  data: function() {
    return {
        dialog: false,
        rows:[],
        cols:[],
        seats:[],
        componentKey: 0,
        no_flight: '',
        pnr:true,
        bill:false,
        flight:{
            origin:'',
            dist:'',
            class_name:'',
            fullname:'',
            flight_id:'',
            aeroplane_id:'',
            seat_id:'',
            price:'',
            pnr:''
        },
        origins: [],
        dists: [],
        classes:[{ name: 'First Class', value: 'A' },
          { name: 'Busniess Classs', value: 'B' },
          { name: 'Economy Class', value: 'C' },
          ],
      title: "Flights System",
      imageLink: {
        main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea",
        sub_main:
          "https://cdn.pixabay.com/photo/2016/11/08/05/01/airline-1807486_1280.jpg",
        logo:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fandroid-chrome-512x512.png?alt=media&token=8a0a66f6-4741-4ff6-8f28-eb9ec74374df",
        social_cover:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4"
      },
      email: "",
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      fieldRules: [
        v => !!v || 'this field is required',
      ],
      subscribed: false
    };
  },
  created() {
        this.set_flights();
    },
  methods: {
      changeFlight(value){
          console.log('a7a');
        this.flight = value; 
        this.bill = true; 
        this.dialog = false;
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
    check_bill(){
        this.$http.plain.get(`/flight_existance?origin=${this.flight.origin}&dist=${this.flight.dist}`)
        .then((response) => {
            console.log(response.data.flight)
            this.flight.flight_id = response.data.flight.id; 
            this.flight.aeroplane_id = response.data.flight.aeroplane_id; 
            this.bill = true;
        })
        .catch(error => {
            console.log(error);
            this.no_flight = "Sorry There's no flight right now"
        })
    },
    book_flight(){
        this.$http.plain.post('/bookings',{booking: this.flight})
        .then((response) => {
            console.log(response);
            response.data.forEach(element => {
                this.origins.push(element.origin);
                this.dists.push(element.dist);
            });
        })
        .catch(error => console.log(error))
    },
    fetchSeats () {
            this.bill = false;
            this.$http.plain.get(`/seats_pnr?pnr=${this.flight.pnr}`)
            .then(response => this.fetchSeatsSuccessful(response))
            .catch(error => console.log(error))
        },
        fetchSeatsSuccessful (response) {
            
            response.data.categories.forEach(element => {
                this.rows.push(element.rows)
                this.cols.push(element.cols)
            });

            this.flight.seat_id = response.data.seat.id;
            this.flight.pnr = response.data.seat.pnr;
            this.flight.category_id = response.data.seat.category_id;
            this.flight.price = response.data.seat.price;
            this.flight.flight_id = response.data.seat.flight_id;
            this.flight.origin = response.data.flight.origin;
            this.flight.dist = response.data.flight.dist;

            this.seats = response.data.seats;
            
            this.componentKey +=1;
            this.dialog =true;
            
        },
    subscribe: function() {
      this.subscribed = !this.subscribed;
    }
  },

  computed: {
    imgHeight: function() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    }
  },

  mounted: function() {
    // this.calculateHeight();
  }
};
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
.blue-grey {
   background-color: rgb(43, 43, 58)!important;
   opacity: 0.9;
   border-color: transparent!important;
 }
</style>
