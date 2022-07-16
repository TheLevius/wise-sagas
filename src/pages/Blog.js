import {useDispatch, useSelector} from 'react-redux';

export default function Blog() {
    const dispatch = useDispatch();
    const blogData = useSelector(store => store);
    console.log('app blogData --->', blogData);
    return (
        <div className="Blog">
            <h1>Blog</h1>
            <button onClick={() => {
                dispatch({type: 'LOAD_SOME_DATA'})
            }}>
                Load some data
            </button>
        </div>
    );
}
