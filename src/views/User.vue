<template>
  <div class="user">
  <div class="header" @click="$router.push('./user-edit')">
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
    <hm-navitem to="/myfollow">
      <template>我的关注</template>
      <template #content>我关注的内容</template>
    </hm-navitem>
    <hm-navitem to="/mycomment"><template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem to="/user-edit"><template>设置</template>
</hm-navitem>
<div style="margin:15px;">
  <van-button type="primary" block @click="logout">退出</van-button>
</div>
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
  },
  methods: {
    async logout() {
      // console.log('123')
      // 弹框提醒
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗?'
        })
      //  .then(() => {
      } catch {
        return this.$toast('取消退出')
      }
      // on confirm
      // console.log('确定定')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast.success('退出成功')
      // .catch(() => {
      //   // on cancel
    //   // console.log('取消消')
    //   this.$toast('取消退出')
    // })
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
