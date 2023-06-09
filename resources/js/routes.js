const Welcome = () => import('./home/List.vue' /* webpackChunkName: "resource/js/components/category/list" */)
const UserList = () => import('./home/List.vue' /* webpackChunkName: "resource/js/components/category/list" */)
const UserCreate = () => import('./home/Add.vue' /* webpackChunkName: "resource/js/components/category/add" */)
const UserEdit = () => import('./home/Edit.vue' /* webpackChunkName: "resource/js/components/category/edit" */)

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Welcome
    },
    {
        name: 'UserList',
        path: '/user',
        component: UserList
    },
    {
        name: 'userEdit',
        path: '/user/:id/edit',
        component: UserEdit,
        props: true
    },
    {
        name: 'userAdd',
        path: '/user/add',
        component: UserCreate
    }
]