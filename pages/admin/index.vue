<template>
    <div>
        <h1>Аналитика по постам</h1>
        <app-analytics-chart
            title="Количество просмотров"
            :labels="analytics.views.labels"
            :data="analytics.views.data"
        />
        <app-analytics-chart
            title="Количество комментариев"
            :labels="analytics.comments.labels"
            :data="analytics.comments.data"
        /> 
    </div>
</template>

<script>
    import appAnalyticsChart from '@/components/admin/AnalyticsChart'

    export default {
        head: {
            title: `Аналитика | ${process.env.appName}`
        },
        layout: 'admin',
        middleware: ['admin-guard'],
        components: {
            appAnalyticsChart
        },
        async asyncData({store}) {
            const analytics = await store.dispatch('posts/getAnalytics')
            return {analytics}
        }
    }
</script>

<style lang="scss" scoped>

</style>