<template>
<div>
    <Button type="primary">SAVE</Button>

    <Switch v-model="switch1" @on-change="change" />
</div>
</template>
<script>
    export default {
        name: 'test',
        data () {
            return {
                switch1: false,
            }
        },
        methods: {
        },
        created(){
        },
         mounted:function(){  
        }  
    }
</script>
