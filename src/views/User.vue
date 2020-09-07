<template>
  <div class="user">
  <div class="header">
    <div class="avatar">
      <img :src="base + user.head_img" alt="">
    </div>
    <div class="info">
      <div class="name">
        <span v-if="user.gender === 1" class="iconfont iconxingbienan"></span>
        <span v-if="user.gender === 0" class="iconfont iconxingbienv"></span>
        <span>{{user.nickname}}</span>
      </div>
      <div class="time">
        {{user.create_date |time}}
      </div>
    </div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
     <!-- 导航条 -->
    <hm-navitem to="/follow">
      <template>我的关注</template>
      <template #content>我关注的内容</template>
    </hm-navitem>
    <hm-navitem><template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem to="/edit"><template>设置</template>
</hm-navitem>
  </div>
</template>

<script>
export default {
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  data() {
    return {
      user: ''
    }
  },
  async created() {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    } else if (statusCode === 401) {
      this.$toast('用户验证失败')
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  }
}
</script>

<style lang="less" scoped>
.user{
  .header{
    display:flex;
    align-items: center;
    padding: 20px 10px ;
    border-bottom: 2px solid #ccc;
    .avatar{
      width: 70px;
      height: 70px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .info{
      flex:1;
      padding-left: 20px;
      font-size: 14px;
      .time{
        margin-top: 10px;
        color: #333;
      }
      .iconxingbienan{
        color: skyblue;
      }
      .iconxingbienv{
        color: pink;
      }
    }
  }

}

</style>
