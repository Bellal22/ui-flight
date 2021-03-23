<template>
    <v-app>
        
    <v-navigation-drawer app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item two-line class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title >{{user}}</v-list-item-title>
        <v-list-item-title>Logged in</v-list-item-title>
        </v-list-item-content>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  

        <v-app-bar app height="80px">
          

      <v-toolbar-title>Flights Mangement</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
      class="mx-2"
      fab
      dark
      small
      color="primary"
      @click="logout"
    >
      <v-icon dark>
        mdi-logout
      </v-icon>
      </v-btn>
    
          
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main class="indigo lighten-5">

          <!-- Provides the application the proper gutter -->
          <!-- <v-container fluid> -->
            
            <slot></slot>
              
            <!-- If using vue-router -->
            <!-- <router-view></router-view> -->
          <!-- </v-container> -->
        </v-main>

        
    </v-app>
</template>
<script>
  export default {
    data () {
      return {
        error:'',
        drawer: true,
        user:'',
        items: [
          { title: 'Create Aeroplanes', icon: 'mdi-airplane-takeoff ',link: "/aeroplanes"},
          { title: 'Create Flights', icon: 'mdi-map-marker', link: "/flights" },
          { title: 'Update Seats', icon: 'mdi-account-group-outline',link: "/seats" },
          { title: 'Add Admin', icon: 'mdi-account-group-outline',link: "/signup" },
        ],
        mini: true,
      }
    },
    mounted() {
      console.log(localStorage);
      if (localStorage.user) this.user = localStorage.user;  
    },

    methods: {
    logout () {
      this.$http.secured.delete('/signin')
      .then(response => {
        delete localStorage.csrf
        delete localStorage.signedIn
        this.$router.replace('/')
      })
      .catch(error => this.setError(error, 'Cannot sign out'))
      },
      setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    }
  }
</script>
