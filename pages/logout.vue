<script setup lang="ts">
// import type {User} from "@/interfaces";
import { useUserStore } from '@/store/user';

 // const loginUserCookie = useCookie<User | null>("loginUser");
 // loginUserCookie.value = null;
 // const loginTokenCookie = useCookie<string>("loginToken");
 // loginTokenCookie.value = null;

// Pinia ストアでユーザー情報とトークンをリセット
const userStore = useUserStore();  // Piniaストアのインスタンス
userStore.clearUser();

// ログイン画面に遷移
await navigateTo("/login");
</script>
