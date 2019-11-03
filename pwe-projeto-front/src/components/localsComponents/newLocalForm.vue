<template>
    <v-overlay :value="overlay">     
        <v-card
        class="pa-10"
        min-width="800"
        light>
        <h1 class="text-center">Novo Estoque</h1>
            <v-form
            class="pa-10"
            ref="form"
            v-model="valid"
            lazy-validation>
                <v-text-field
                v-model="location.name"
                :counter="30"
                :rules="generalRules"
                label="Nome"
                required>
                </v-text-field>

                <v-text-field
                v-model="location.adress"
                :counter="30"
                :rules="generalRules"
                label="Endereço"
                required>
                </v-text-field>

                <v-row>
                    <v-col
                    cols="7">
                        <v-text-field
                        v-model="location.city"
                        :counter="30"
                        :rules="generalRules"
                        label="Cidade"
                        required>
                        </v-text-field>
                    </v-col>

                    <v-col
                    cols="3">
                        <v-text-field
                        v-model="location.postCode"
                        v-mask="'#####-###'"
                        :counter="9"
                        :rules="generalRules"
                        label="CEP"
                        required>
                        </v-text-field> 
                    </v-col>

                    <v-col
                    cols="2">
                        <v-text-field
                        v-model="location.state"
                        :counter="2"
                        max-lenght="2"
                        :rules="generalRules"
                        label="UF"
                        required>
                        </v-text-field>
                    </v-col>
                </v-row>

                
               
                       
                
                
                <v-text-field
                    v-model="location.obs"
                    :counter="30"                    
                    label="Observação"
                    required>
                </v-text-field>
        
                <v-row
                justify="space-around"
                class="mt-10">
                    <v-col 
                    class="d-flex justify-center"
                    md="4">
                        <v-btn
                        color="danger"
                        class="mr-4"
                        @click="closeComponent()">
                        Cancelar
                        </v-btn>
                    </v-col>                    

                    <v-col 
                    class="d-flex justify-center"
                    md="4">
                        <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate">
                        Salvar
                        </v-btn>  
                    </v-col>                           
                </v-row>                                      
            </v-form>
        </v-card>
    </v-overlay>
    
    
</template>
<script>
import { mask } from 'vue-the-mask'
export default {
    name:"NewLocalForm",
    directives: {
      mask,
    },
    props:{
        overlay:Boolean
    },
    data(){
        return{
            valid: true,
            location : {
                name : "",
                adress : "",
                postCode : "",
                city : "",
                state : "",
                obs : ""
            },         
            generalRules: [
                v => !!v || 'Campo obrigatorio',
                v => (v && v.length <= 30) || 'Nome do local deve ter no máximo 30 caracteres',
            ],            
        }
    },
    methods:{      
        closeComponent(){
            this.$emit('close', false);
        },
        validate () {
            if (this.$refs.form.validate()) {
                this.$emit('new-location', this.location);
                this.closeComponent()
            }
        }          
    }    
}
</script>