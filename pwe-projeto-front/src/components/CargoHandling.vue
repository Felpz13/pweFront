<template>
    <v-container>
        <h1 class="text-center">Nova Movimentação</h1>

        <v-row
        justify="space-around"
        class="mt-10">
            <v-col
            cols="4">
                <v-btn block
                class="button-frame green"
                @click="newTransaction.transactionBool = true">
                    <v-icon large 
                    color="white">
                        mdi-arrow-up
                    </v-icon>
                    <h2>Entrada</h2>
                </v-btn>
            </v-col>
            <v-col
            cols="4">
                <v-btn block
                class="button-frame red"
                @click="newTransaction.transactionBool = false">             
                    <v-icon large 
                    color="white">
                        mdi-arrow-down
                    </v-icon>
                    <h2>Saida</h2>
                </v-btn>           
            </v-col>
        </v-row>

        <v-container>
            <v-card 
            class="mt-10">
                <v-card-title
                :style="{'background-color' : transactionTypeColor, 'color' : 'white'}">
                    <h4>{{transactionTypeText}}</h4>
                </v-card-title>
                <div
                class="pa-10">
                    <form>
                        <v-autocomplete
                        v-model="newTransaction.idProduct"
                        label="Produto"
                        :items="productsDatabase">
                            <template slot="no-data">
                                <p>Nenhum resultado encontrado!!</p>
                            </template>
                        </v-autocomplete>

                        <v-autocomplete
                        v-model="newTransaction.idLocal"
                        label="Estoque"
                        :items="localDatabase">
                            <template slot="no-data">
                                <p>Nenhum resultado encontrado!!</p>
                            </template>
                        </v-autocomplete>

                        <v-row>
                            <v-col
                            cols="5">
                                <v-text-field
                                v-model="newTransaction.quantity"
                                :counter="4"
                                v-mask="'####'"
                                label="Quantidade"
                                required>
                                </v-text-field>
                            </v-col>

                            <v-col
                            cols="5">
                                <v-text-field
                                readonly
                                v-model="newTransaction.date"
                                v-mask="'##/##/####'"
                                label="Dia"
                                required>
                                </v-text-field>
                            </v-col>

                            <v-col>
                                <v-btn
                                @click="addTransaction()">
                                    Finalizar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </form>
                </div>
            </v-card>
        </v-container>
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
import { mask } from 'vue-the-mask'
import axios from "axios"
import baseUrl from "../utils/baseUrl.js"

export default {
    name:"CargoHandling",
    directives: {
      mask,
    },
    mounted(){        
        this.newTransaction.date = this.getCurrentDay()
        
        axios.get(`${baseUrl()}local`)
        .then(response => {
            response.data.forEach(local => {
                this.localDatabase.push(local.name)               
            });
        })

        axios.get(`${baseUrl()}product`)
        .then(response => {
            response.data.forEach(product => {
                this.productsDatabase.push(product.name)          
            });
        })
    },
    data(){
        return{       
            url: `${baseUrl()}cargoHandling`,
            snackbar: false,
            snackbarText: String,     
            snackbarColor: "green",     
            newTransaction: {
                idLocal: "",
                idProduct: "",
                quantity: "",
                date: "",
                transactionBool : true, //true -> entrada  |  false -> saida
                transactionType : "entrada"
            },
            localDatabase: [],
            productsDatabase: []
        }
    },
    methods:{
        getCurrentDay(){
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();

            return `${dd}/${mm}/${yyyy}`
        },
        addTransaction(){             
            return axios.post(this.url, this.newTransaction)
            .then(response => {         
                if(response.data != 0){    
                this.snackbarText = `transação realizada com sucesso!`
                this.snackbarColor = "green"
                
                }else{
                    this.snackbarText = "Não é possível realizar a transação, falta produto no estoque!"
                    this.snackbarColor = "red"
                }
                this.snackbar = true
            })
        }
    },
    computed:{
        transactionTypeText(){
            return this.newTransaction.transactionBool ? "Nova Entrada de Produto" : "Nova Saída de Produto"
        },
        transactionTypeColor(){
            return this.newTransaction.transactionBool ? "green" : "red"
        }
    },
    watch:{
        'newTransaction.transactionBool'(){
            this.newTransaction.transactionBool ? this.newTransaction.transactionType = "entrada" : this.newTransaction.transactionType = "saida" 
        } 
    }
}
</script>

<style scoped>
.button-frame{
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100px;
}

.button-frame.green{
    background-color: green;
    
}

.button-frame.red{
    background-color: red; 
}
</style>