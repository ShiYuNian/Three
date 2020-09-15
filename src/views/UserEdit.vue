<template>
  <div class="user-edit">
      <hm-header>编辑资料</hm-header>
      <!-- 头像 -->
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          <van-uploader :after-read="afterRead" />
      </div>
      <!-- 导航 -->
      <hm-navitem @click="showNickname">
          <template>昵称</template>
          <template #content>{{ user.nickname }}</template>
      </hm-navitem>
      <hm-navitem @click="showPassword">
          <template>密码</template>
          <template #content>*********</template>
      </hm-navitem>
      <hm-navitem @click="ShowGender">
          <template>性别</template>
          <template #content>{{ user.gender === 1 ? '男':'女' }}</template>
      </hm-navitem>
      <!-- 渲染dialog组件 -->
       <van-dialog v-model="isShowNickname" title="编辑昵称" show-cancel-button @confirm="updateNickname">
        <van-field v-model="nickname" ref="nickname" placeholder="请输入用户名" />
</van-dialog>
 <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="updatePassword">
        <van-field v-model="password" ref="password" placeholder="请输入密码" />
</van-dialog>
      <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="updateGender">
        <!-- <van-radio-group v-model="gender">
  <van-radio :name="1">男</van-radio>
  <van-radio :name="0 ">女</van-radio>
</van-radio-group> -->
    <van-radio-group v-model="gender">
      <van-cell-group>
        <van-cell title="男" clickable @click="radio = 1">
          <template #right-icon>
            <van-radio :name= 1 />
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="radio = 0">
          <template #right-icon>
            <van-radio :name= 0 />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>`
</van-dialog>

<!-- 裁剪的模态框 -->
<div class="mask" v-show="isShowMask">
  <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
   <van-button type="danger" class="cancel" @click="isShowMask = false">取消</van-button>
<vueCropper
  ref="aa"
  :img="img"
  autoCrop
  autoCropWidth='100'
  autoCropHeight="100"
  fixed
  ></vueCropper>
</div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: '',
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1,
      isShowMask: false,
      img: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
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
    },
    async showNickname() {
      // console.log('123')
      this.isShowNickname = true
      this.nickname = this.user.nickname

      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    async updateUser(data) {
      //  console.log(123)
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updateNickname() {
      // console.log(123)
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   nickname: this.nickname
      // })
      // console.log(res.data)
      // if (res.data.statusCode === 200) {
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        nickname: this.nickname
      })
    },
    async showPassword() {
    // console.log('123')
      this.isShowPassword = true
      this.password = this.user.password

      await this.$nextTick()
      this.$refs.password.focus()
    },
    async updatePassword() {
      // console.log(123)
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   password: this.password
      // })
      // console.log(res.data)
      // if (res.data.statusCode === 200) {
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        password: this.password
      })
    },
    ShowGender() {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    updateGender() {
      this.updateUser({
        gender: this.gender
      })
    },
    isImg(name) {
      if (name.endsWith('.gif') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.jprg')) {
        return true
      } else {
        return false
      }
    },
    async afterRead(file) {
      // 检验图片类型大小
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请上传图片')
      }
      if (file.file.size >= 60 * 1024) {
        return this.$toast.fail('上传图片太大')
      }
      // 显示裁剪框
      this.isShowMask = true
      // 设置裁剪图片
      this.img = file.content
    },
    crop() {
      this.$refs.aa.getCropBlob(async blod => {
      // console.log('文件读取完毕', file)
        const fd = new FormData()
        // 给formdat对象添加上传文件
        fd.append('file', blod)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.updateUser({
            head_img: data.url
          })
          this.isShowMask = false
        }
      })
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
     .van-uploader {
       position: absolute;
       left: 50%;
       top: 40px;
       transform: translate(-50%);
      //  padding: 40px 0;
      //  text-align: center;
      //  img{
        width: 100px;
        height: 100px;
        opacity: 0;

      //   border-radius: 50%;
    // }
 }
}

/deep/.van-dialog__content {
  padding:15px;
}
.van-field {
  border:1px solid #cccccc;
}

.mask {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: fixed;
    top: 0;
    z-index:1;
  }
  .cancel {
    right: 0;
  }
}
</style>
