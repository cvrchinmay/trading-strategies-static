<template>
    <div class="main-div">
        <router-view></router-view> 
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import {filters} from './utils/utils'
export default {
    methods: {
        ...mapActions('portfolio', ['setFilters'])
    },
    created () {
        // setting all the filters here.
        // We can store these filters at db and send an api call    
        this.setFilters(filters)
    }
}
</script>

<style>
* {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.main-div {
    width: 100%;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    list-style: none;
    background-color: #01131B;
    min-height: 300px;
    padding: 15px;
}
</style>

