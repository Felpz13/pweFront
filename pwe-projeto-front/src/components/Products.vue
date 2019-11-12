<template>
    <v-container>
        <div
        class="d-flex flex-row-reverse mb-5 mr-10">
            <v-btn :color="newProductButtonColor" fab large dark @click="newProduct = !newProduct">
                <v-icon>{{newProductButtonIcon}}</v-icon>
            </v-btn>
        </div>

        <v-card 
        class="mb-5"
        v-show="newProduct">
            <v-row class="pa-10">
                <v-col
                cols="3">
                    <v-text-field
                    v-model="product.name"
                    :counter="30"
                    label="Nome"
                    required>
                    </v-text-field>
                </v-col>
                <v-col
                cols="3">
                Fazer Select
                    <v-text-field
                    v-model="product.type"
                    :counter="30"
                    label="Tipo"
                    required>
                    </v-text-field>
                </v-col>
                <v-col
                cols="3">
                    Fazer Select
                    <v-text-field
                    v-model="product.un"
                    :counter="30"
                    label="Unidade de medida"
                    required>
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-btn color="success" fab large dark @click="addProduct()">
              <v-icon>mdi-check</v-icon>
            </v-btn>
                </v-col> 
            </v-row>
        </v-card>

        <v-data-table 
        :headers="tableHeaders"
        :items="productList"
        :items-per-page="5"
        v-on:click:row="openDeleteModal(arguments[0])"
        class="elevation-1 text-center">
        
            <template v-slot:item.action="{ item }">
                <v-icon red @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <v-container slot="no-data">
                <v-alert type="error">
                Nenhum produto criado!
                </v-alert>
            </v-container>

        </v-data-table>       
        
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
import axios from "axios"
import baseUrl from "../utils/baseUrl.js"
export default {
    name:"Products",
    data(){
        return{  
            url:  `${baseUrl()}product`,
            snackbar: false,
            snackbarText: String,     
            snackbarColor: "green",
            tableHeaders: [
                { text: 'Nome', value: 'name' },
                { text: 'Tipo', value: 'type' },
                { text: 'Unidade de medida', value: 'un' },
                { text: 'Quantidade em estoque', value: 'quantity' },
                { text: 'Excluir Cadastro', value: 'action', sortable: false}
            ],
            newProduct : false,
            product:{
                name : "",
                type : "",
                un : ""
            },
            productList:[],
        }
    }, 
    methods:{
        deleteItem(item){
            if(item.quantity < 1){
                this.productList.splice(item, 1)
                this.snackbarText = `${item.name} excluido com sucesso!`
                this.snackbarColor = "green"
                
            }else{
                this.snackbarText = "Não é possível excluir produto com item em estoque!"
                this.snackbarColor = "red"
            }
            this.snackbar = true
        },
        getAll(){
            return axios.get(this.url)
                .then(response => {
                this.productList = response.data
            })
        },
        addProduct(){
        return axios.post(this.url, this.product)
            .then(response => {         
            console.log(response)
            
            if(response.status == 200){
                this.snackbarShow("Produto adicionado com sucesso", "green", true)            
                this.getAll()       
            }else{           
                this.snackbarShow(`Ocorreu um problema ao criar o Produto (erro ${response.status})`, "red", true)
            }
            }).catch(error =>{
                this.snackbarShow(`Ocorreu um problema ao criar o Produto (erro ${error.response})`, "red", true)
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
    },
    computed:{
        newProductButtonIcon(){
            return this.newProduct? 'mdi-cancel' : 'mdi-plus'
        },
        newProductButtonColor(){
            return this.newProduct? 'red' : 'success'
        }
    }
}
</script>