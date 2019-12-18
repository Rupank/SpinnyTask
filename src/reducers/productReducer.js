import { FETCH_DATA_SUCCEEDED, FETCH_DATA_FAILED, FETCH_DATA_REQUESTED, FETCH_MORE_SUCCEDDED, FETCH_SEARCH_SUCCEDDED, FETCH_CHAR_DATA_SUCCEDED, FETCH_CHAR_DATA_REQUESTED } from '../actions/types';

const initialState = {
    items: [],
    isLoading: true,
    page: 1,
    searchInput: 'test',
    error: '',
    charInfo: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_REQUESTED:
            return { ...state, isLoading: true }
        case FETCH_DATA_FAILED:
            return { error: action.payload.error.message, isLoading: false }
        case FETCH_DATA_SUCCEEDED:
            return { ...state, items: action.payload.data, isLoading: false, error: '' }
        case FETCH_SEARCH_SUCCEDDED:
            return {
                ...state, items: action.payload.data, isLoading: false, error: '',
                searchInput: action.payload.input, page: action.payload.pageNo
            }
        case FETCH_MORE_SUCCEDDED:
            return { items: [...state.items, ...action.payload.data], searchInput: action.payload.input, isLoading: false, error: '', page: action.payload.pageNo }
        case FETCH_CHAR_DATA_REQUESTED:
            return { ...state, charInfo: '' }
        case FETCH_CHAR_DATA_SUCCEDED:
            return { ...state, charInfo: action.payload.data }
        default:
            return state;
    }
}

export const getData = state => state.items;
export const getPending = state => state.isLoading;
export const getError = state => state.error;
export const getPage = state => state.page;
export const getInput = state => state.searchInput;
export const getCharInfo = state => state.charInfo;
