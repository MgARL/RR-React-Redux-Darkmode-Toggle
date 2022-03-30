import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    objectId: 10245,
    apiData: {} 
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return { ...state, apiData: action.payload }
        },
        incrementIdOne: (state) => {
            return { ...state, objectId: state.objectId + 1}
        },
        decrementIdOne: (state) => {
            if(state.objectId > 1 ){
                return {...state, objectId: state.objectId - 1 }
            }else{
                return {...state, objectId: state.objectId}
            }
        },
        customId: (state, action) => {
            return {...state, objectId: action.payload }
        },
        clearData: () => {
            return initialState
        }

    }
})

export const { setData, incrementIdOne, decrementIdOne, customId, clearData } = dataSlice.actions

export const fetchData = () =>{
    const fetchDataThunk = async (dispatch, getState) => {
        let state = getState()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const resData = await response.json()
        dispatch(setData(resData))
    }
    return fetchDataThunk
}

export default dataSlice.reducer