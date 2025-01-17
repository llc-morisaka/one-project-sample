import type {User} from "@/interfaces";
import { useUserStore } from '@/store/user';



export default defineNuxtRouteMiddleware(
  (to, from) => {

    // Piniaストアからユーザー情報を取得
    const userStore = useUserStore();
    const loginUser = userStore.user;
    const loginToken = userStore.token;
    
    if(loginUser == null || loginToken == null) {
      return navigateTo("/login");
    } else {
      return;
    }


/*
    const loginTokenCookie = useCookie<string | null>("loginToken");
    const loginUserCookie = useCookie<User | null>("loginUser");
    
    if(loginTokenCookie.value == null || loginUserCookie.value == null) {
      return navigateTo("/login");
    } else {
      return;
    }
*/
  }
);
