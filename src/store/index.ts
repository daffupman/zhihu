import {Commit, createStore} from 'vuex'
import axios from 'axios'

export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}

export interface PostProps {
    _id: number;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps;
    createdAt: string;
    column: string;
}

export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: number;
    column?: string;
    email?: string;
}

export interface GlobalDataProps {
    token: string;
    loading: boolean;
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
    error: GlobalErrorProps
}

export interface ImageProps {
    id?: string;
    url?: string;
    createdAt?: string;
}

export interface GlobalErrorProps {
    status: boolean;
    message?: string;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    const { data } = await axios.get(url)
    commit(mutationName, data)
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
    const { data } = await axios.post(url, payload)
    commit(mutationName, data)
    return data
}

const store = createStore<GlobalDataProps>({
    state: {
        token: localStorage.getItem('token') || '',
        loading: false,
        columns: [],
        posts: [],
        user: {
            isLogin: false,
        },
        error: { status: false }
    },
    // 同步操作
    mutations: {
        // login(state) {
        //     state.user = { ...state.user, isLogin: true, name: 'zhengjin'}
        // },
        createPost(state, newPost) {
            state.posts.push(newPost)
        },
        fetchColumns(state, rawData) {
            state.columns = rawData.data.list
        },
        fetchColumn(state, rawData) {
            state.columns = [rawData.data]
        },
        fetchPosts(state, rawData) {
            state.posts = rawData.data.list
        },
        setLoading(state, status) {
            state.loading = status
        },
        setError(state, e: GlobalErrorProps) {
            state.error = e
        },
        login(state, rawData) {
            const {token} = rawData.data;
            state.token = rawData.data.token
            localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        },
        fetchCurrentUser(state, rawData) {
            state.user = {isLogin: true, ...rawData.data}
        }
    },
    // 可以同步，可以异步
    actions: {
        async fetchColumns({ commit }) {
            await getAndCommit('/columns', 'fetchColumns', commit)
        },
        async fetchColumn({ commit }, cid) {
            await getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
        },
        async fetchPosts({ commit }, cid) {
            await getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
        },
        async login({commit}, payload) {
            return postAndCommit('/user/login', 'login', commit, payload)
        },
        async fetchCurrentUser({commit}) {
            await getAndCommit(`/user/current`, 'fetchCurrentUser', commit)
        },
        loginAndFetch({dispatch}, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        }
    },
    modules: {},
    getters: {
        getColumnById: (state) => (id: string) => {
            return state.columns.find(c => c._id === id)
        },
        getPostsByCid: (state) => (cid: string) => {
            return state.posts.filter(post => post.column === cid)
        }
    }
})

export default store