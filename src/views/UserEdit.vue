<template>
  <div class="user-edit">
      <hm-header>编辑资料</hm-header>
      <!-- 头像 -->
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <!-- 导航 -->
      <hm-navitem>
          <template>昵称</template>
          <template #content>{{ user.nickname }}</template>
      </hm-navitem>
      <hm-navitem>
          <template>密码</template>
          <template #content>*********</template>
      </hm-navitem>
      <hm-navitem>
          <template>性别</template>
          <template #content>{{ user.gender === 1 ? '男':'女' }}</template>
      </hm-navitem>
  </div>
</template>
<script>
export default {
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
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
    padding: 40px 0;
    text-align: center;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
}
</style>
