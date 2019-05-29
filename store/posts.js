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
    async getAminPosts({commit}) {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(posts)
            }, 200);
        })
    },
    async removePost({commit}, id) {
        try {
            
        } catch (error) {
            
        }
    },
    async getPostById({commit}, postId) {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(posts.find(p => p._id === postId))
            }, 200);
        })
    },
    async updatePost({commit}, {id, text}) {
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
        
    }

}