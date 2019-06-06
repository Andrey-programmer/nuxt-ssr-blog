<template>
  <el-row
    type="flex"
    justify="center"
  >
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <app-post 
        v-for="post in posts"
        :key="post._id"
        :post="post"
      />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from '~/components/main/Post.vue'

export default {
  head:{
    title: `Главная | ${process.env.appName}`,
    meta: [
      {hid: 'homepaged', name: 'description', content: 'Самый лучший js блог'},
      {hid: 'homepagek', name: 'keywords', content: 'блог, js, nuxt'}
    ]
  },
  async asyncData({store}) {
    try {
      const posts = await store.dispatch('posts/getPosts')
      return {posts}
    } catch (error) {
      throw error
    }
  },
  components: {
    AppPost
  }
}
</script>

