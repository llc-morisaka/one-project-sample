<script setup lang="ts">
import type { User } from "@/interfaces";
import axios from "axios";

definePageMeta({
  middleware: ["loggedin-check"]
});

const PAGE_TITLE = "利用者詳細";
useHead({ title: PAGE_TITLE });

const breadcrumbs = [
  { text: 'TOP', link: 'index' },
  { text: '利用者一覧', link: 'user-userList' },
  { text: PAGE_TITLE },
];

const responseData = ref<any>(null);
const pending = ref(false);
const error = ref<Error | null>(null);
const authStr = {
  1: "権限低",
  2: "権限中",
  3: "権限高",
  9: "Administrator"
};

const route = useRoute();

pending.value = true;
try {
  const response = await axios.get(`/user-management/users/${route.params.id}`);
  responseData.value = response.data;
  error.value = null;
} catch (err) {
  error.value = err as Error;
} finally {
  pending.value = false;
}

const authNote = computed((): string => {
  if (user.value?.authLevel != undefined) {
    return authStr[user.value.authLevel];
  }
  return "--";
});

const user = computed((): User | undefined => {
  return responseData.value?.data[0];
});

const isEmptyList = computed((): boolean => {
  return responseData.value?.data.length == 0;
});

const noServerError = computed((): boolean => {
  return error.value == null && responseData.value?.result == 1;
});
</script>

<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" />

  <section class="user-detail">
    <h2 class="user-detail__title">利用者詳細情報</h2>

    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>データ取得中...</p>
    </div>

    <template v-else>
      <template v-if="noServerError">
        <p v-if="isEmptyList" class="empty-message">指定された利用者情報は存在しません</p>

        <dl v-else class="user-info">
          <div class="user-info__row">
            <dt>ID</dt>
            <dd>{{ user?.id }}</dd>
          </div>
          <div class="user-info__row">
            <dt>名前</dt>
            <dd>{{ user?.name }}</dd>
          </div>
          <div class="user-info__row">
            <dt>ログインID</dt>
            <dd>{{ user?.loginId }}</dd>
          </div>
          <div class="user-info__row">
            <dt>権限レベル</dt>
            <dd>{{ authNote }}</dd>
          </div>
        </dl>
      </template>
      <p v-else class="error-message">サーバからデータ取得中に障害が発生しました</p>
    </template>
  </section>
</template>

<style scoped>
.user-detail {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-detail__title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: #555;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.user-info {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.user-info__row {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}

.user-info__row:last-child {
  border-bottom: none;
}

dt {
  font-weight: bold;
  color: #333;
}

dd {
  color: #555;
  margin: 0;
}

.empty-message {
  text-align: center;
  font-size: 16px;
  color: #666;
  padding: 20px;
}

.error-message {
  color: #d9534f;
  font-weight: bold;
  text-align: center;
}
</style>
