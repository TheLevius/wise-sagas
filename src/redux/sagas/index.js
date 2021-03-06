import {spawn, call, all, take, fork, takeLatest, cancel, actionChannel } from 'redux-saga/effects';
import loadBasicData from "./initialSagas";
import pageLoaderSaga from "./pageLoaderSaga";

export function* fetchPlanets(signal) {
    console.log('LOAD_SOME_DATA starts')
    const response = yield call(fetch, 'https://swapi.dev/api/planets');
    const data = yield  call([response, response.json]);

    console.log('LOAD_SOME_DATA completed', data);
}

export function* loadOnAction() {
    const channel = yield actionChannel('LOAD_SOME_DATA');
    while(true) {
        yield take(channel)
        console.log('LOG');
        yield call(fetchPlanets)
    }
    // yield takeLatest(fetchPlanets, 'LOAD_SOME_DATA')

    // let task;
    // let abortController = new AbortController();
    // while(true) {
    //     yield take('LOAD_SOME_DATA');
    //     if (task) {
    //         abortController.abort();
    //         yield cancel(task);
    //         abortController = new AbortController();
    //     }
    //
    //     task = yield fork(fetchPlanets, abortController.signal);
    // }
}

export default function* rootSaga() {

    const sagas = [
        // loadBasicData,
        // pageLoaderSaga,
        loadOnAction
    ];

    const retrySagas = yield sagas.map((saga) => {

        return spawn( function* () {
            while(true) {
                try {
                    console.log('call saga: ', saga);
                    yield call(saga);
                    break;
                } catch (e) {
                    console.log(e)
                }
            }
        })
    })
    yield all(retrySagas); // effect non-blocking
}