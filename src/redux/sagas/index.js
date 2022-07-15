import { takeEvery, put, call, fork, spawn, join, select } from 'redux-saga/effects';

// const wait = (t) => new Promise((resolve) => {
//     setTimeout(resolve, t);
// })
async function swapiGet(route) {
    const request = await fetch(`https://swapi.dev/api/${route}`);
    const data = await request.json();
    return data;
}
export function* loadPeople() {
    const people = yield call(swapiGet, 'people');
    yield put({ type: 'SET_PEOPLE', payload: people.results}); // put it is dispatch
    console.log('load people');
    return people;
}
export function* loadPlanets() {
    const planets = yield call(swapiGet, 'planets');
    yield put({ type: 'SET_PLANETS', payload: planets.results}); // put it is dispatch
    console.log('load planets');
    return planets;

}
export function* workerSaga() {
    console.log('run parallel tasks');
    const task = yield spawn(loadPeople);
    yield fork(loadPlanets);

    const people = yield join(task);
    const store = yield select((store) => store)
    console.log('end parallel tasks', people, store);
    // take & call блокирующие
    // fork & spawn не блокирующие
    // select - не блокирующая
    // join - подождать неблокирующую операцию и получить ее результат

}
export function* watchClickSaga() {
    // while (true) { // imperative style
    //     yield take('CLICK');
    //     yield workerSaga();
    // }
    yield takeEvery( 'LOAD_DATA', workerSaga); // every
    // yield takeLatest('CLICK', workerSaga); // debounce
}
export default function* rootSaga() {
    yield watchClickSaga();
}