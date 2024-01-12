import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import { fetchCharacters } from './store/slices/character';

function App() {
  const dispatch = useDispatch();


  useEffect(() =>{
    dispatch(fetchCharacters())
  }, []);


  return (
    <div>App</div>
  )
}

export default App