<script setup>
import loginPath from '@/assets/image/login-1.jpg';
import { ElMessageBox } from 'element-plus';
const router = useRouter();
const { setErrorLog, setAdmin } = useAppStore();
const cookie = useCookie('house-view', {
  maxAge: 60 * 60 * 24,
});

const loginType = ref('L');

const changeType = type => {
  loginType.value = type;
};

const login = async form => {
  if (form.type === 'N') {
    const res = await $fetch('/api/admin/create', {
      method: 'POST',
      body: {
        account: form.user.account,
        password: form.user.password,
      },
    });
    console.log(res);
    ElMessageBox.alert('新增帳號成功', '提醒', {
      confirmButtonText: 'OK!',
    }).then(() => {
      changeType('L');
    });
  } else {
    const res = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        account: form.user.account,
        password: form.user.password,
      },
    });
    if (!res.status) {
      cookie.value = {
        token: res.token,
        admin: {
          _id: res.admin._id,
          account: res.admin.account,
        },
      };
      setAdmin(res.admin);
      router.push('/map');
    } else {
      setErrorLog({
        title: 'Login Failed!',
        type: 'error',
        description: `帳號/密碼錯誤或不存在`,
      });
    }
  }
};

onMounted(() => {
  cookie.value = null;
});
</script>

<template>
  <div class="login" :style="`background-image: url(${loginPath})`">
    <div class="blur-img">
      <div class="login">
        <Login
          v-model:loginType="loginType"
          desc="這是一個關於看房記事本的網頁"
          @login-go="login"
          @types="changeType"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login {
  @apply w-full h-full bg-cover bg-center;
  .blur-img {
    @apply w-full h-full flex flex-col justify-center items-center backdrop-blur-lg p-2 md:p-0;
    .login {
      @apply md:w-144 h-144 p-1 md:p-12 bg-black bg-opacity-30 rounded-3xl flex flex-col justify-center items-center;
    }
  }
}
</style>
