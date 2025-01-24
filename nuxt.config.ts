// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      weatherInfoUrl: "https://api.openweathermap.org/data/2.5/weather",
      // APIキーの設定は.envに
      weathermapAppid: ""
    }
  },
  modules: [
    '@pinia/nuxt'
  ]

});


