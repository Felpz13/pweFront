<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>

        <v-list-item @click="selectMenu('home')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="selectMenu('locals')">
          <v-list-item-action>
            <v-icon>mdi-map-marker</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Locais</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="selectMenu('products')">
          <v-list-item-action>
            <v-icon>mdi-basket</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Produtos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="selectMenu('cargoHandling')">
          <v-list-item-action>
            <v-icon>mdi-truck-fast</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Nova Movimentação</v-list-item-title>
          </v-list-item-content>
        </v-list-item>   

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-content 
    style="background-image: linear-gradient(to right, #ffffff 20%, #d7dbf0);
    color: black;">
      <v-container fluid>
        <home
        v-if="menu.home"/>
        <locals 
        v-if="menu.locals"/>
        <products
        v-if="menu.products"/>
        <cargo-handling 
        v-if="menu.cargoHandling"/>
      </v-container>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; IFSP 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Locals from "./components/Locals.vue"
  import Home from "./components/Home.vue"
  import Products from "./components/Products.vue"
  import CargoHandling from "./components/CargoHandling.vue"

  export default {    
    name:"Main",
    components:{
      Locals,
      Home,
      Products,
      CargoHandling
    },
    data: () => ({
      drawer: null,
      menu : {
        home: true,
        locals: false,
        products: false,
        cargoHandling : false
      }      
    }),
    methods:{
      selectMenu(item){       
        for(let menuItem in this.menu){          
          menuItem == item ? this.menu[menuItem] = true : this.menu[menuItem] = false          
        }
      }
    },
    computed:{
      title(){
        if(this.menu.home){
          return "Estoque IFSP"
        }else if(this.menu.locals){
          return "Locais"
        }else if(this.menu.products){
          return "Produtos"
        }else if(this.menu.cargoHandling){
          return "Movimentações"
        }     
        return ""   
      }
    }
  }
</script>

