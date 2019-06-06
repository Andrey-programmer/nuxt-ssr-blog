<template>
<article class="post">
    <header class="post-header">
        <div class="post-title">
            <h1>{{post.title}}</h1>
            <nuxt-link :to="'/'">
                <i class="el-icon-back"></i>
            </nuxt-link>
        </div>
        <div class="post-info">
            <small>
                <i class="el-icon-time"></i>
                {{post.date | date}}
            </small>
            <small>
                <i class="el-icon-view"></i>
                {{post.views}}
            </small>
        </div>
        <div class="post-image">
            <img
                :src="post.imageUrl"
                alt="post-image"
                class="post-img"
            >
        </div>
    </header>
    <main class="post-content">
        <vue-markdown>{{post.text}}</vue-markdown>
    </main>
    <footer>
        <app-comment-form 
            v-if="canAddComment"
            @created="createCommentHandler"
            :postId="post._id"
        />
        <div class="comments"
            v-if="post.comments.length"
        >
            <app-comment
                v-for="comment in post.comments"
                :key="comment._id"
                :comment="comment"
            ></app-comment>
        </div>
        <div
            class="text-center"
            v-else 
        >
            Комментариев пока нет
        </div>
    </footer>
</article>
</template>

<script>
import AppComment from '~/components/main/Comment.vue'
import AppCommentForm from '~/components/main/CommentForm.vue'

export default {
    data() {
        return {
            canAddComment: true,
            comment: '' 
        }
    },
    head() {
        return {
            title: `${this.post.title} | ${process.env.appName}`,
            meta: [
                {hid: `postd-${this.post._id}`, name: 'description', content: this.post.title},
                {hid: `postk-${this.post._id}`, name: 'keywords', content: 'блог, js, nuxt'}
            ]
        }
    },
    async asyncData({store, params}) {
        const post = await store.dispatch('posts/getPostById', params.id)
        await store.dispatch('posts/addView', post)
        return {
            post: {...post, views: ++post.views} 
        }
    },
    components: {
        AppComment,
        AppCommentForm
    },
    validate({params}) {
        return !!params.id
    },
    methods: {
        createCommentHandler(comment) {
            this.post.comments.unshift(comment) // Добавляем вновь появившийся комментарий в начало списка
            this.canAddComment = false
        }
    }
}
</script>

<style lang="scss" scoped>
.post {
    max-width: 600px;
    margin: 0 auto;

    &-header {
        margin-bottom: 1.5rem;
    }

    &-title,
    &-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        align-items: center;
    }

    &-info {
        margin-bottom: .5rem;
    }

    &-content {
        margin-bottom: 2rem;
    }

    &-img {
        width: 100%;
        height: auto;
    }
}
</style>
