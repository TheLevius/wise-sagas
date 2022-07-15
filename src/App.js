import {useDispatch, useSelector} from "react-redux";

function App() {
  const store = useSelector(store => store);
  const dispatch = useDispatch();
  console.log(store.reducer);
  return (
    <div className="App">
        <h1>redux-saga tutorial</h1>
      <button onClick={() => { dispatch({ type: 'LOAD_DATA'})}}>
        click me
      </button>
    </div>
  );
}

export default App;
