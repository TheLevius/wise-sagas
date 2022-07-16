import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function App() {
  const store = useSelector(store => store);
  console.log(store);
  return (
    <div className='App'>
        <h1>redux-saga tutorial</h1>
        <Link to='/blog'>
          open blog
        </Link>
    </div>
  );
}

export default App;
