<template>
    <v-container>
        <v-row>
            <v-col
            cols="4">
                <v-autocomplete
                v-model="selectedLocal"
                label="Selecione o estoque"
                :items="localList">
                    <template slot="no-data">
                        <p>Nenhum resultado encontrado!!</p>
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>

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
                    <v-combobox
                    v-model="product.type"
                    :items="type"
                    label="Selecione um tipo"
                    ></v-combobox>
                </v-col>
                <v-col
                cols="3">                 
                    <v-combobox
                    v-model="product.un"
                    :items="un"
                    label="Selecione a unidade de medida"
                    ></v-combobox>               

                </v-col>
                <v-col class="d-flex justify-center" cols="3">
                    <v-btn                    
                    color="success"
                    class="mr-4"
                    @click="addProduct()">
                    Salvar
                    </v-btn>              
                </v-col> 
            </v-row>
        </v-card>

        <v-data-table 
        :headers="tableHeaders"
        :items="filteredProductList"
        :items-per-page="5"    
        class="elevation-1 text-center">
         
            <template v-slot:item.action="{ item }">
                <v-icon red @click="removeProduct(item)">mdi-delete</v-icon>
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
    created(){
        this.getAll()
    },
    mounted(){
        axios.get(`${baseUrl()}local`)
        .then(response => {
            response.data.forEach(local => {
                this.localList.push(local.name)               
            });
        })
    },
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
            selectedLocal: "",
            filteredProductList : [],
            localList: [],            
            un: ["un", "caixa", "kg", "litro"],
            type: ["perecível", "não perecível", "quimíco", "inflamável"]        
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
                this.filteredProductList = response.data
            })
        },
        addProduct(){
        return axios.post(this.url, this.product)
            .then(response => {         
                       
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
        removeProduct(product){            
            
            return axios.delete(`${this.url}/${product.id}`)
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
        },
        productList(){
            //todo - pegar os produtos do end point enviar 
            this.getAll();
        }
    }
}
</script>