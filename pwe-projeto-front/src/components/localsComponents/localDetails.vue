<template>
    <v-container v-if="local">
        <v-btn class="mx-2" fab dark large color="indigo" @click="closeDetails()">
            <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
        <v-container
        class="d-flex ma-4">
            <v-row
            class="text-center">
                <h1>{{local.name}}</h1>
            </v-row>            
        </v-container>
        
    </v-container>
</template>
<script>
export default {
    name:"LocalDetails",
    props:{
        local: Object,
    },
    methods:{
        closeDetails(){
            this.$emit('close', false)
        }
    }
}
</script>