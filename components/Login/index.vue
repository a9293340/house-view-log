<script setup>
import ErrorMsg from "./ErrorMsg.vue";
const { setErrorLog } = useAppStore();
const emit = defineEmits(["loginGo", "types"]);
const router = useRouter();

const props = defineProps({
	desc: {
		type: String,
		default: "",
	},
	loginType: {
		type: String,
		default: "L",
	},
});

const loginType = computed(() => props.loginType);

const user = ref({
	account: "",
	password: "",
	doubleCheck: "",
});

const checkUpCase = computed(() => /[A-Z]/.test(user.value.password));
const checkDownCase = computed(() => /[a-z]/.test(user.value.password));
const checkNumberCase = computed(() => /\d/.test(user.value.password));
const checkAmountCase = computed(() =>
	/[a-zA-Z\d]{8,}/.test(user.value.password)
);
const checkSameCase = computed(
	() =>
		user.value.password === user.value.doubleCheck &&
		user.value.password !== "" &&
		user.value.doubleCheck !== ""
);
const checkAccountCase = ref(true);

const validationInput = ref(null);
const checkValue = ref(null);

watch(user.value, async (newIndex) => {
	const res = await $fetch("/api/admin/check", {
		method: "POST",
		body: {
			account: newIndex.account,
		},
	});
	checkAccountCase.value = res.length === 0;
});

const goToMap = () => {
	router.push("/map");
};

const checkValidCaptcha = (value) => (checkValue.value = value);
const changeType = (type) => {
	emit("types", type);
};
const summitLogin = () => {
	if (!checkValue.value) return;
	if (
		!validationInput.value ||
		checkValue.value.toUpperCase() !== validationInput.value.toUpperCase()
	) {
		setErrorLog({
			title: "輸入錯誤!",
			type: "error",
			description: "請檢察輸入內容",
		});
		return;
	}
	if (props.loginType === "N") {
		if (!checkAccountCase.value) {
			setErrorLog({
				title: "輸入錯誤!",
				type: "error",
				description: "帳號已被使用",
			});
			return;
		}
		if (!checkSameCase.value) {
			setErrorLog({
				title: "輸入錯誤!",
				type: "error",
				description: "密碼重複驗證失敗",
			});
			return;
		}
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
				user.value.password
			)
		) {
			setErrorLog({
				title: "輸入錯誤!",
				type: "error",
				description: "密碼不符合規範",
			});
			return;
		}
	}
	emit("loginGo", {
		user: { ...user.value },
		type: loginType.value,
	});
};
</script>

<template>
	<div class="title">{{ loginType === "L" ? "登入" : "註冊" }}</div>
	<div class="p">{{ props.desc }}</div>
	<el-input
		size="large"
		class="login-input"
		:placeholder="loginType === 'L' ? '請填入帳號' : '請輸入想申請之帳號'"
		v-model.trim="user.account"
		autocomplete="off"
	>
		<template #prepend>
			<IconTemplate color="black" :size="28" icon="mdi-account" class="mr-2" />
		</template>
	</el-input>
	<div class="double-check" v-if="loginType === 'N'">
		<ErrorMsg msg="帳號可用" v-model:check="checkAccountCase" />
	</div>
	<el-input
		type="password"
		size="large"
		class="login-input"
		:placeholder="
			loginType === 'L'
				? '請填入密碼'
				: '密碼須至少8碼並包含大小寫跟數字各至少一個'
		"
		v-model.trim="user.password"
		autocomplete="off"
	>
		<template #prepend>
			<IconTemplate color="black" :size="24" icon="mdi-password" class="mr-2" />
		</template>
	</el-input>
	<el-input
		type="password"
		size="large"
		class="login-input"
		v-if="loginType !== 'L'"
		placeholder="請再次輸入密碼"
		v-model.trim="user.doubleCheck"
		autocomplete="off"
	>
		<template #prepend>
			<IconTemplate color="black" :size="24" icon="mdi-password" class="mr-2" />
		</template>
	</el-input>
	<div class="double-check" v-if="loginType === 'N'">
		<ErrorMsg msg="包含一個大寫" v-model:check="checkUpCase" />
		<ErrorMsg msg="包含一個小寫" v-model:check="checkDownCase" />
		<ErrorMsg msg="包含一個數字" v-model:check="checkNumberCase" />
		<ErrorMsg msg="總數8碼" v-model:check="checkAmountCase" />
		<ErrorMsg msg="密碼重複輸入正確" v-model:check="checkSameCase" />
	</div>
	<div class="login-validation">
		<el-input
			class="validation-input"
			size="default"
			placeholder="請填入驗證碼"
			v-model.trim="validationInput"
			autocomplete="off"
			@keyup.enter.native="summitLogin"
		/>
		<VueClientRecaptcha :value="validationInput" @getCode="checkValidCaptcha" />
	</div>

	<el-button class="login-btn" @click="summitLogin">{{
		loginType === "L" ? "登入" : "註冊"
	}}</el-button>
	<div class="new-admin">
		<p @click="changeType('N')" v-if="loginType === 'L'">新增帳號</p>
		<p @click="changeType('L')" v-if="loginType === 'N'">登入</p>
		<p @click="goToMap">訪客</p>
	</div>
</template>

<style lang="scss" scoped>
.title {
	@apply text-white text-3xl mb-6;
}

.double-check {
	@apply flex flex-col -mt-5 mb-3  w-96 justify-start pl-5;
	p {
		@apply flex flex-row items-center text-green-400;
	}
	p.not-right {
		@apply text-red-600;
	}
}
.new-admin {
	@apply w-full flex flex-row justify-around mt-4;
	p {
		@apply text-white text-base hover:text-blue-300 duration-200 cursor-pointer;
	}
}
.p {
	@apply text-white text-sm w-112 h-20 flex justify-center mb-4;
}
.login-input {
	@apply lg:w-96 w-80 h-10 mb-8;
}
.login-validation {
	@apply mb-14 lg:w-96 w-80 h-12 rounded bg-white flex justify-between pl-3 items-center;
}
.validation-input {
	@apply w-48 h-12;
}
.login-btn {
	@apply lg:w-96 w-80 h-10 bg-blue-500 border-blue-500 text-white text-lg;
}

:deep(.el-input-group__prepend) {
	@apply border-none w-14 bg-white;
}
:deep(.el-input__wrapper) {
	@apply shadow-none bg-white;
}
:deep(.vue_client_recaptcha) {
	@apply flex justify-start items-center;
}
</style>
