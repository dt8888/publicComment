<template>
  <div class="bgView">
    <head-bar :title="newTitle" :set="newSet" :is-back="isBack" :is-set="isSet"></head-bar>
    <div class="bgScored">
      <div>
        <img  class="headerImg" src="http://yijiao.oss-cn-qingdao.aliyuncs.com/web/1472127058468.jpg">
        <div class="grade-box">
          <div class="score">商品评分</div>
          <div class="bgImg">
            <img v-for="(star,index) in stars" v-bind:src="star.src" v-on:click="rating(index,'starts')" alt="星星图片" />
          </div>
        </div>
      </div>
      <div class="scoreInfo">{{scoreInfo}}</div>
    </div>
    <div class="line"></div>
    <div class="inputText">
      <textarea v-bind:maxlength="Surplus" @input="descArea" v-model="inputText" name="abstract" id="abstract" placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧！"></textarea>
      <div class="selectPic">
        <up-Load :multiple="true" :max=6 :list="imgList" ref="upload"></up-Load>
      </div>
    </div>
    <div class="bgName">
      <img src="../../static/Images/sel@2x.png">
      <div class="unName">匿名</div>
    </div>
    <div class="line2"></div>
    <div class="severce">
      <div class="attitudeOfService">服务态度</div>
      <div class="bgImg">
        <img v-for="(star,index) in severceStarts" v-bind:src="star.src" v-on:click="rating(index,'severce')" alt="星星图片" />
      </div>
    </div>
    <div class="publish" @click="publicComment">发布</div>
  </div>
</template>

<script>
import Headbar from '../components/headerBar'
import uploadImages from '../components/uploadImages'
var starOffImg = '../../static/Images/star02@2x.png'
var starOnImg = '../../static/Images/star@2x.png'
export default {
  data: function () {
    return {
      scoreInfo: '很满意',
      inputText: '',
      Surplus: 140,
      newTitle: '商品评价',
      scoreStartNum: 5, // 商品评分
      severStartNum: 5, // 服务评分
      newSet: '     ',
      isBack: true,
      isSet: true,
      stars: [{
        src: starOnImg,
        active: true
      }, {
        src: starOnImg,
        active: true
      }, {
        src: starOnImg,
        active: true
      },
      {
        src: starOnImg,
        active: true
      }, {
        src: starOnImg,
        active: true
      }
      ],
      severceStarts: [{
        src: starOnImg,
        active: true
      }, {
        src: starOnImg,
        active: true
      }, {
        src: starOnImg,
        active: true
      },
      {
        src: starOnImg,
        active: true
      }, {
        src: starOnImg,
        active: true
      }]
    }
  },
  components: {
    'head-bar': Headbar,
    'up-Load': uploadImages
  },
  methods: {
    // 评分
    rating: function (index, string) {
      if (string === 'starts') {
        var total = this.stars.length // 星星总数
        var idx = index + 1 // 这代表选的第idx颗星-也代表应该显示的星星数量
        // 进入if说明页面为初始状态
        if (this.scoreStartNum === 0) {
          this.scoreStartNum = idx
          for (var i = 0; i < idx; i++) {
            this.stars[i].src = starOnImg
            this.stars[i].active = true
          }
        } else {
          // 如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的。
          if (idx == this.scoreStartNum) {
            for (var i = index; i < total; i++) {
              if (i != 0) {
                this.stars[i].src = starOffImg
                this.stars[i].active = false
              }
            }
          }
          // 如果小于当前最高星级，则直接保留当前星级
          if (idx < this.scoreStartNum) {
            for (var i = idx; i < this.scoreStartNum; i++) {
              if (i != 0) {
                this.stars[i].src = starOffImg
                this.stars[i].active = false
              }
            }
          }
          // 如果大于当前星级，则直接选到该星级
          if (idx > this.scoreStartNum) {
            for (var i = 0; i < idx; i++) {
              this.stars[i].src = starOnImg
              this.stars[i].active = true
            }
          }

          var count = 0 // 计数器-统计当前有几颗星
          for (var i = 0; i < total; i++) {
            if (this.stars[i].active) {
              count++
            }
          }
          this.scoreStartNum = count
        }
        if (this.scoreStartNum === 1) {
          this.scoreInfo = '很差'
        } else if (this.scoreStartNum === 2) {
          this.scoreInfo = '差'
        } else if (this.scoreStartNum === 3) {
          this.scoreInfo = '一般'
        } else if (this.scoreStartNum === 4) {
          this.scoreInfo = '满意'
        } else if (this.scoreStartNum === 5) {
          this.scoreInfo = '很满意'
        }
      } else {
        var total = this.severceStarts.length // 星星总数
        var idx = index + 1 // 这代表选的第idx颗星-也代表应该显示的星星数量
        // 进入if说明页面为初始状态
        if (this.severStartNum == 0) {
          this.severStartNum = idx
          for (var i = 0; i < idx; i++) {
            this.severceStarts[i].src = starOnImg
            this.severceStarts[i].active = true
          }
        } else {
          // 如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的。
          if (idx === this.severStartNum) {
            for (var i = index; i < total; i++) {
              if (i != 0) {
                this.severceStarts[i].src = starOffImg
                this.severceStarts[i].active = false
              }
            }
          }
          // 如果小于当前最高星级，则直接保留当前星级
          if (idx < this.severStartNum) {
            for (var i = idx; i < this.severStartNum; i++) {
              if (i != 0) {
                this.severceStarts[i].src = starOffImg
                this.severceStarts[i].active = false
              }
            }
          }
          // 如果大于当前星级，则直接选到该星级
          if (idx > this.severStartNum) {
            for (var i = 0; i < idx; i++) {
              this.severceStarts[i].src = starOnImg
              this.severceStarts[i].active = true
            }
          }

          var count = 0 // 计数器-统计当前有几颗星
          for (var i = 0; i < total; i++) {
            if (this.severceStarts[i].active) {
              count++
            }
          }
          this.severStartNum = count
        }
      }
    },
    descArea () {
      var textVal = this.introduct.length
      this.Surplus = 200 - textVal
    },
    // 发布评论
    publicComment () {
      // this.scoreStartNum 代表商品评分
      // this.severStartNum 代表服务态度
      // this.inputText  代表心得
      // base64的图片流直接传给服务端，服务端传给阿里云，也可前端直接上传，拿到url链接上传到服务端。

    }
  },
  name: 'gotoComment'
}
</script>

<style scoped>
  .bgView{
    padding: 15px 15px;
  }
  .headerImg{
    width:4.8125rem;
    height: 4.8125rem;
  }
  .score{
    color: #333333;
    font-size: .875rem;
    margin-left: 10px;
    display: inline-block;
  }
  .bgScored{
    position: relative;
    margin-top: -15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .bgImg img{
    margin-left: 5px;
    width: 1.09375rem;
    height:1.03125rem ;
  }
  .grade-box{
    position: absolute;
    top: 1.6875rem;
    left: 5.0275rem;
    display: inline-block;
  }
  .bgImg{
    display: inline-block;
    margin-left: 5px;
  }
  .line{
    margin-top: -5px;
    margin-left: -23px;
    margin-right: -23px;
    background: #c4c3c3;
    height: 1px;
    opacity: 0.3;
  }
  .scoreInfo{
    color:#999999 ;
    font-size: .75rem;
  }
  .inputText{
    width: 100%;
    margin-top: 10px;
    border-bottom: 1px solid #eef1f5;
  }
  .inputText textarea{
    width: 100%;
    height: 5.5rem;
    /*outline: none;*/
    /*overflow:auto;*/
    border: none;
    font-size: .75rem;
    /*background-attachment:fixed;*/
    /*background-repeat:no-repeat;*/
    /*border-style:solid;*/
    /*border-color:#FFFFFF*/
  }
  .selectPic{
    margin-top: 10px;
    width: 100%;
  }
  .unName{
    display: inline-block;
    color:#333333 ;
    margin-left: 5px;
    vertical-align: middle;
    font-size: .75rem;
  }
  .bgName{
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
  }
  .bgName img{
    width: 17px;
    height: 17px;
  }
  .line2{
    margin-top: -5px;
    margin-left: -23px;
    margin-right: -23px;
    background: #c4c3c3;
    height: 8px;
    opacity: 0.3;
  }
  .attitudeOfService{
    color: #333333;
    font-size: .875rem;
    display: inline-block;
  }
  .severce{
    display: flex;
    height: 60px;
    align-items: center;
  }
  .publish{
    width: 100%;
    height: 40px;
    background: #3fc9a5;
    color: white;
    font-size:.875rem ;
    border-radius: 20px;
    line-height: 40px;
  }
</style>
