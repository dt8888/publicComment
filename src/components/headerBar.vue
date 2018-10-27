
<template>
  <div>
    <header>
      <!-- <i class="iconfont icon-fanhui fz" @click="$router.go(-1)" v-show="isBack"></i> -->
      <i class="iconfont icon-fanhui fz" @click="$router.go(-1)" v-show="isBack"></i>
      <span class="title">
        {{title}}
      </span>
      <span class="set" v-show="isSet" @click="toSet(newSet)">
        {{newSet}}
      </span>
    </header>
    <!-- 此处是占位符 -->
    <div class="zanweifu"></div>
  </div>
</template>

<script>
export default {
  name: 'headerBar',
  data: function () {
    return {
      name: ''
    }
  },
  props: ['title', 'set', 'isBack', 'isSet'],
  computed: {
    newTitle () {
      return this.title
    },
    newSet () {
      return this.set
    }
  },
  methods: {
    toSet: function (val) {
      let _this = this
      console.log(val)
      let data = {
        newSet: val
      }
      _this.$emit('newSet', data)
    }
  }
}
</script>

<style scoped>
  header {
    height: 64px;
    background: #3c4657;
    /* font-size: 0.32rem; */
    color: #353535;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 99;
  }
  .fz {
    font-size: 1.25rem /* 20/16 */;
    color: #ffffff;
    padding-left:1.375rem /* 22/16 */;
    position: absolute;
  }
  .title {
    display: inline-block;
    font-size: 1.125rem /* 18/16 */;
    text-align: center;
    color: #ffffff;
    width: 100%;
  }
  .zanweifu {
    margin-top: 0.88rem;
  }
  .set{
    display: inline-block;
    font-size: .875rem /* 14/16 */;
    padding-right: 10% /* 15/16 */;
    color: #ffffff;
    position: absolute;
    right: 0;
  }
</style>
