import {call, apply, takeEvery, take, fork, put} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'redux-first-history';

function* loadBlogData() {
    const request = yield call(fetch, 'https://swapi.dev/api/vehicles');
    const data = yield apply(request, request.json);

    console.log('blog data', data);
    yield put({type: 'BLOG_LOADED', payload: data});
}

export default function* pageLoaderSaga() {
    while (true) {
        const action = yield take(LOCATION_CHANGE);
        if (action.payload.location.pathname.endsWith('blog')) {
            yield fork(loadBlogData)
        }
        console.log('action ---->: ', action);
    }
    // yield takeEvery('LOAD_BLOG_DATA', loadBlogData);
}