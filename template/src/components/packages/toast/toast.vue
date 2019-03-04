<template>
    <transition name="fade">
        <div v-if="show" class="v-toast" :class="position">
            {{tips}}
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                tips:'toast组件',
                show:true,
                duration:2000,
                position:'top'
            }
        },
        mounted(){
            setTimeout(()=>{
                this.show=false;
            },this.duration)
        },
        methods: {}
    }
</script>


<style scoped lang="scss">
    .v-toast{
        position: fixed;
        left: 50%;
        opacity: 0.9;
        background: #232940;
        padding: 15px 26px;
        border-radius: 52px;
        transform: translateX(-50%);
        color: #fff;
        &.top{
            top: 20%;
        }
        &.bottom{
            bottom:20%;
        }
        &.center{
            top:50%;
            transform: translateY(-50%);
        }
    }
    .fade-enter-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .fade-leave-active {
        transition: opacity 1s;
    }
</style>

