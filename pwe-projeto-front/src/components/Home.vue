<template>
    <v-container>
        <div
        class="mb-5">            
            <h1 class="text-center">Como funciona?</h1>
        </div>

        <v-img
        src="../assets/capa.png"
        height="525">
            <template v-slot:default>
                <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown"
                class="pa-10">
                    <v-timeline-item
                    v-for="(item, i) in items"
                    :key="i"
                    :color="item.color"
                    :icon="item.icon"
                    fill-dot>
                        <v-card
                        :color="item.color"
                        dark>
                            <v-card-title class="title">{{item.title}}</v-card-title>
                            <v-card-text 
                            class="white text--primary pt-4">
                            <p>{{item.text}}</p>
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </template>
        </v-img>              
    </v-container>
</template>
<script>
export default {
    name:"Home",
    data(){
        return{
            items: [
                {
                color: 'red lighten-2',
                icon: 'mdi-map-marker',
                title: 'Locais',
                text: "Cadastre um local de Estoque"
                },
                {
                color: 'purple darken-1',
                icon: 'mdi-basket',
                title: 'Produtos',
                text: "Cadastre seus Produtos"
                },
                {
                color: 'green lighten-1',
                icon: 'mdi-truck-fast',
                title: 'Nova Movimentação',
                text: 'Realize movimentações de entrada/saída dos produtos cadastrados nos locais cadastrados!'
                },
            ],
        }
        
    }
}
</script>