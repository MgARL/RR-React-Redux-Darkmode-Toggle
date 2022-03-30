import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchData, incrementIdOne, decrementIdOne, customId, clearData } from './features/dataSlice'

function App() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const showImage = () => {
    if(data.apiData.title){
      return <img style={{width: '80vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else{
      return null
    }
  }

  useEffect(() => {
    dispatch( fetchData())
  },[data.objectId])

  return (
    <div className="App">
      <div>
        <button onClick={() => {dispatch( fetchData())}}>Trigger Thunk</button>
        <button onClick={() => {dispatch(incrementIdOne())}}>Next</button>
        <button onClick={() => {dispatch(decrementIdOne())}}>Back</button>
        <button onClick={() => {dispatch(clearData())}}>Clear</button>
      </div>
      <input onChange={(e) => {dispatch(customId(Number(e.target.value)))}} />
      <div>
        <h1>{data.objectId}</h1>
        {showImage()}
      </div>
    </div>
  );
}

export default App;
