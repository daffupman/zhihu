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

interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
    columnId?: string;
}

export interface GlobalDataProps {
    loading: boolean;
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
}

export interface ImageProps {
    id?: string;
    url?: string;
    createdAt?: string;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    const { data } = await axios.get(url)
    await new Promise(resolve => setTimeout(resolve, 3000))
    commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
    state: {
        loading: false,
        columns: [],
        posts: [],
        user: {
            isLogin: true,
            name: 'zhengjin',
            columnId: '1'
        }
    },
    // 同步操作
    mutations: {
        login(state) {
            state.user = { ...state.user, isLogin: true, name: 'zhengjin'}
        },
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