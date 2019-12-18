import { FETCH_DATA_REQUESTED, FETCH_CHAR_DATA_REQUESTED, FETCH_DATA_FAILED, FETCH_CHAR_DATA_FAILED, FETCH_DATA_SUCCEEDED, FETCH_MORE_SUCCEDDED, FETCH_SEARCH_SUCCEDDED, FETCH_CHAR_DATA_SUCCEDED } from './types';
import axios from 'axios';
const BASE_URL = 'https://api.jikan.moe/v3/search/anime?limit=16';

export function fetchData(searchInput, pageNo) {
    return function (dispatch) {
        dispatch({
            type: FETCH_DATA_REQUESTED
        });

        axios.get(`${BASE_URL}&q=${searchInput}&page=${pageNo}`)
            .then(data => {
                dispatch({ type: FETCH_DATA_SUCCEEDED, payload: { data: data.data.results, input: searchInput } });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_DATA_FAILED,
                    payload: { error: error }
                })
            });
    }
}

export function fetchSearchData(searchInput, pageNo) {
    return function (dispatch) {
        dispatch({
            type: FETCH_DATA_REQUESTED
        });

        axios.get(`${BASE_URL}&q=${searchInput}&page=${pageNo}`)
            .then(data => {
                dispatch({ type: FETCH_SEARCH_SUCCEDDED, payload: { data: data.data.results, input: searchInput, pageNo: pageNo } });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_DATA_FAILED,
                    payload: { error: error }
                })
            });
    }
}

export function fetchMoreData(input, pageNo) {
    return function (dispatch) {
        dispatch({
            type: FETCH_DATA_REQUESTED,
        });
        axios.get(`${BASE_URL}&q=${input}&page=${pageNo + 1}`)
            .then(data => {
                dispatch({ type: FETCH_MORE_SUCCEDDED, payload: { data: data.data.results, input: input, pageNo: pageNo + 1 } });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_DATA_FAILED,
                    payload: { error: error }
                })
            });
    }
}

export function fetchCharData(url) {
    return function (dispatch) {
        dispatch({
            type: FETCH_CHAR_DATA_REQUESTED,
        });
        axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
            .then(data => {
                dispatch({ type: FETCH_CHAR_DATA_SUCCEDED, payload: { data: data.data } });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_CHAR_DATA_FAILED,
                    payload: { error: error }
                })
            });
    }
}
