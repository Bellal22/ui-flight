<template>
    <v-container>
      <!-- snack bars -->
      <v-snackbar
      v-model="snackbar"
    >{{ respond_message }}
    </v-snackbar>
      <!--  -->
        <h2 class="pa-4">Create a new Aeroplane</h2>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
        <v-row class="white" elevation="3">
          
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="aeroplane.model"
            :rules="nameRules"
            
            label="Aeroplane Name"
            required
          ></v-text-field>
        </v-col>
         <v-col
          cols="12"
          md="8"
        >
        <h3 class="pt-3">{{aeroplane.seats_no}} Seats</h3>
         </v-col>
         
<!-- First Class -->
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="classes.A.cols"
            :rules="emailRules"
            
            label="First Class - seats of row"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="classes.B.cols"
            :rules="emailRules"
            label="Business Class - seats of row"
            required
          ></v-text-field>
        </v-col>
        <!-- Business Class -->
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="classes.C.cols"
            :rules="emailRules"
            
            label="Economy Class - seats of row"
            required
          ></v-text-field>
        </v-col>
<!-- Economy Class -->
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="classes.A.rows"
            :rules="emailRules"
            label="First Class - Number of rows"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="classes.B.rows"
            :rules="emailRules"
            
            label="Business Class - Number of rows"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model.number="classes.C.rows"
            :rules="emailRules"
            label="Economy Class - Number of rows"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        />
        <v-col
          cols="12"
          md="4"
        >
        <v-btn
        depressed
        color="primary"
        @click="addAeroplane"
        >
            Add Aeroplane
            <v-icon right dark
            >mdi-airplane</v-icon>
        </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="4"
        />
          
      </v-row>
      </v-form>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      
      snackbar: false,
      respond_message:'',
      classes: {
        A:{
          rows:'',
          cols:''
        },
        B:{
          rows:'',
          cols:''
        },
        C:{
          rows:'',
          cols:''
        }
      },
      aeroplane:{
        model: '',
        seats_no: 0
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters',
      ],
      emailRules: [
        v => !!v || 'this field is required',
        v => Number.isInteger(Number(v)) &&  Number(v) > 0|| "The value must be an integer number"
      ],
    }),
    watch: {
      'classes.A.cols': function (val) {
        this.clculate_seats();
      },
      'classes.B.cols': function (val) {
        this.clculate_seats();
      },
      'classes.C.cols': function (val) {
        this.clculate_seats();
      },
       'classes.A.rows': function (val) {
        this.clculate_seats();
      },
      'classes.B.rows': function (val) {
        this.clculate_seats();
      },
      'classes.C.rows': function (val) {
        this.clculate_seats();
      },
    },
    methods:{
      clculate_seats(){
        this.aeroplane.seats_no =  (this.classes.A.rows * this.classes.A.cols) + (this.classes.B.rows * this.classes.B.cols)+(this.classes.C.rows * this.classes.C.cols)  ;
      },
      addAeroplane () {
      this.$http.plain.post('/aeroplane', { aeroplane: this.aeroplane , classes: this.classes })
        .then(response => this.addAeroplaneSuccessful(response))
        .catch(error => this.addAeroplaneFailed(error))
    },
    addAeroplaneSuccessful (response) {
      console.log(response);
      this.respond_message = response.data.message; 
      this.$refs.form.resetValidation();
      this.$refs.form.reset();  
      this.snackbar = true; 
    },
    addAeroplaneFailed (error) {
      this.respond_message = error.message; 
      this.snackbar = true;
    }
  }
}
</script>
