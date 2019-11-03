<template>
  <v-container>    

    <div
      class="d-flex flex-row-reverse mb-5 mr-10">
        <v-btn color="success" fab large dark @click="newLocal = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>   

    <new-local-form 
    v-if="newLocal" 
    :overlay="newLocal" 
    v-on:close="newLocal = arguments[0]"
    v-on:new-location="addLocal(arguments[0])"/>

    <v-data-table 
    :headers="tableHeaders"
    :items="localsList"
    :items-per-page="5"
    v-on:click:row="openDeleteModal(arguments[0])"
    class="elevation-1">

      <v-container slot="no-data">
        <v-alert type="error">
          Nenhum local de estoque criado!
        </v-alert>
      </v-container>

    </v-data-table>      
    
      <v-overlay 
      :value="showDeleteModal">     
        <v-card
        class="pa-10"
        max-width="400"
        light>
        <p>Deseja mesmo deletar o estoque: "{{selectedLocal.name}}"?</p>
        <v-row>
          <v-col
          class="d-flex justify-center">
            <v-btn color="error" fab large dark @click="showDeleteModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col
          class="d-flex justify-center">
            <v-btn color="success" fab large dark @click="removeLocal()">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        </v-card>
      </v-overlay>

    <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    top="top"
    right="right">    
      {{ snackbarText }}
      <v-btn
        color="white"
        text
        @click="snackbar = false">
        Fechar
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import NewLocalForm from "./localsComponents/newLocalForm.vue"
import axios from "axios"
import baseUrl from "../utils/baseUrl.js"

export default {
  name:"Locals",
  components:{
    NewLocalForm,
  },
  mounted(){
    this.getAll()
  },
  data(){
    return{      
      url: `${baseUrl()}local`,
      snackbar: false,
      snackbarText: String,  
      snackbarColor: "green",
      newLocal: false,
      showDeleteModal: false,
      selectedLocal: {},    
      tableHeaders: [
        { text: 'Nome do Local', value: 'name' },
        { text: 'Endereço do Local', value: 'adress' },
        { text: 'CEP', value: 'postCode' },
        { text: 'Cidade', value: 'city' },
        { text: 'Estado', value: 'state' },
        { text: 'Obs', value: 'obs' }
      ],
      localsList:[],
    }
  }, 
  methods:{    
    getAll(){
      return axios.get(this.url)
        .then(response => {
        this.localsList = response.data
      })
    },
    addLocal(local){
      return axios.post(this.url, local)
        .then(response => {         
           console.log(response)
          
          if(response.status == 200){
            this.snackbarShow("Local adicionado com sucesso", "green", true)            
            this.getAll()       
          }else{           
            this.snackbarShow(`Ocorreu um problema ao criar o Local (erro ${response.status})`, "red", true)
          }
      }).catch(error =>{
        this.snackbarShow(`Ocorreu um problema ao criar o Local (erro ${error.response})`, "red", true)
      })      
    },
    removeLocal(){            
      //TODO: Verificar se tem algum item no estoque antes de deletar.
      return axios.delete(`${this.url}/${this.selectedLocal.id}`)
        .then(response => {
        this.showDeleteModal = false
        this.getAll()
      })       
      
    },
    openDeleteModal(local){
      this.selectedLocal = local     
      this.showDeleteModal = true 
    },
    snackbarShow(text, color, show){
      this.snackbarText = text
      this.snackbarColor = color
      this.snackbar = show
    }
  }
}
</script>