<template>
    <div class="singer">
        歌手
        <Test tag="h2">
            #$slot.default 我是标题
            <p>wuwu <span>vvv</span></p>
            <!-- <Top></Top> -->
        </Test>
    </div>
</template>
<script>
import Test from '@/components/Test'
// import Top from '@/components/Topbar'
export default {
    name:'Singer',
    components:{
        Test,
        // Top
    }
}
</script>