<template>
<article class="post">
    <header class="post-header">
        <div class="post-title">
            <h1>Post title</h1>
            <nuxt-link :to="'/'">
                <i class="el-icon-back"></i>
            </nuxt-link>
        </div>
        <div class="post-info">
            <small>
                <i class="el-icon-time"></i>
                {{new Date().toLocaleString()}}
            </small>
            <small>
                <i class="el-icon-view"></i>
                42
            </small>
        </div>
        <div class="post-image">
            <img
                src="@/static/images/tropic.jpg"
                alt="post-image"
                class="post-img"
            >
        </div>
    </header>
    <main class="post-content">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut sequi nostrum doloremque optio modi quis ad dolorem facere quaerat?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut sequi nostrum doloremque optio modi quis ad dolorem facere quaerat?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut sequi nostrum doloremque optio modi quis ad dolorem facere quaerat?</p>
    </main>
    <footer>
        <app-comment-form 
            v-if="canAddComment"
            @created="createCommentHandler"
        />
        <div class="comments"
            v-if="true"
        >
            <app-comment
                v-for="comment of 4"
                :key="comment"
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
    components: {
        AppComment,
        AppCommentForm
    },
    validate({params}) {
        return !!params.id
    },
    methods: {
        createCommentHandler() {
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
