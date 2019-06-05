const posts = [
    {
        title: 'Post 1',
        date: new Date(),
        views: 22,
        comments: [1, 2],
        _id: 'id1'
    },
    {
        title: 'Post 2',
        date: new Date(),
        views: 25,
        comments: [1, 2, 16],
        _id: 'id2'
    }
]

export const actions = {
    async getAnalytics({commit}) {
        try {
            return await this.$axios.$get('/api/post/admin/get/analytics')
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    async getAdminPosts({commit}) {
        try {
            return await this.$axios.$get('/api/post/admin')
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
        // return await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(posts)
        //     }, 200);
        // })
    },
    async getPosts({commit}) {
        try {
            return await this.$axios.$get('/api/post')
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    async removePost({commit}, id) {
        try {
            return await this.$axios.$delete(`/api/post/admin/${id}`)
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    async getAdminPostById({commit}, postId) {
        try {
            return await this.$axios.$get(`/api/post/admin/${postId}`)
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    async getPostById({commit}, postId) {
        try {
            return await this.$axios.$get(`/api/post/${postId}`)
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    async updatePost({commit}, {id, text}) {
        try {
            return await this.$axios.$put(`/api/post/admin/${id}`, {text})
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    async createPost({commit}, {title, text, image}) {

        try {
            /* Формируем файл для отправки */
            const fData = new FormData()
            fData.append('title', title)
            fData.append('text', text)
            fData.append('image', image, image.name)

            return await this.$axios.$post('/api/post/admin', fData)
            // console.log(fData)

            // return await new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         resolve((fData) => {console.log(fData)
            //         fData})
            //     }, 200);
            // })
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    async addView({commit}, {_id, views}) {
        try {
            return await this.$axios.$put(`/api/post/add/view/${_id}`, {views})
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    }
}