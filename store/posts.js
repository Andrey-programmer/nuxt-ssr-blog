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
    async renovePost({commit}, id) {
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
    async updatePost({commit}, formData) {
    }

}