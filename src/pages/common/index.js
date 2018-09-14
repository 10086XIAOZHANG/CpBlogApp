module.exports = {
    path: 'common',
    childRoutes: [
        {
            path: 'RepositoryCell',
            component: require('./component/RepositoryCell')
        },
        {
            path: 'RespositoryTrendingCell',
            component: require('./component/RespositoryTrendingCell')
        }
    ]
};