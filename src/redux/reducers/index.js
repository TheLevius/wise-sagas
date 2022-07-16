const initialState = {
    people: [],
    planets: [],
    blog: null
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'BLOG_LOADED':
            return ({...state, blog: action.payload})
        default: return state;
    }
};