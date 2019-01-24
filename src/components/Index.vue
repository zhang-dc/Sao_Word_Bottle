<template>
  <div class="index-container">
    <div class="tobeach">

    </div>
    <div class="mybottles">

    </div>
    asda
    <div @click='asdasd(sadas)' class="aaa" v-show="ss">

    </div>
    <div v-for="item in dx" :key="item.s">
      {{item.s}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      sadas: 1,
      ss: false,
      dx: [
        {
          s: 1,
          b: 1,
        },
        {
          s: 1,
          b: 1,
        },
        {
          s: 1,
          b: 1,
        }
      ]
    }
  },
  methods: {
    asdasd(a) {
      if (a == 1) {
        alert(a)
        this.sadas = 0
      } else if (a == 0) {
        alert(a)
        this.sadas = 1
      }
    }
  },
  created () {
    alert('aaas')
    
  }
}
</script>

<style scoped>
.aaa {
  height: 50px;
  width: 20px;
  background: black;
}
</style>
