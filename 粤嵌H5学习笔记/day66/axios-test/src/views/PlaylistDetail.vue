<template>
  <div class="PlaylistDetail">
      <Back :title="'歌单:'+this.$route.params.id"></Back>
  </div>
</template>
<script>
import Back from "@/components/Back";
export default {
  name: "PlaylistDetail",
  components:{
    Back
  },
  data() {
    return{}
  },
  computed:{
      id(){
          return this.$route.params.id
      }
  },
  methods:{

  },
  beforeRouteUpdate(to,from){
      console.log(`from'${from}'to'${to}'`)
  }
};
</script>
