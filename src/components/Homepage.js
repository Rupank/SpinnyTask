import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMoreData, fetchData, fetchSearchData, fetchCharData } from '../actions/productActions';
import { getData, getPending, getError, getPage, getInput } from '../reducers/productReducer';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

export class HomePage extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchData, queryInput, pageNo } = this.props;
        fetchData(queryInput, pageNo);
    }

    loadMore = () => {
        const { fetchMoreData, pageNo, queryInput } = this.props;
        fetchMoreData(queryInput, pageNo);
    }

    parseName(name) {
        if (name.length > 25) {
            name = name.substring(0, 23) + '...';
        }
        return name;
    }

    applySearch(input) {
        const { fetchSearchData, queryInput } = this.props;
        if (queryInput === input) {
            return;
        }
        fetchSearchData(input, 1);
    }

    openCharInfoPage(url) {
        debugger;
        const { fetchCharData } = this.props;
        fetchCharData(url);
    }

    render() {
        const { dataList, error, isLoading } = this.props;
        console.log(dataList);
        return (
            <div className="main">
                <SearchBar handleSearch={e => this.applySearch(e)} />
                {
                    error && <div>{error}</div>
                }
                <div className="list">
                    {
                        dataList && dataList.map(char => (
                            < div className="charDiv" key={char.mal_id}
                            // onClick={(e) => this.openCharInfoPage(char.url)}
                            >
                                <Link to={{
                                    pathname: `/anime/${char.mal_id}`,
                                    state: {
                                        url: char.url
                                    }
                                }} >
                                    <img src={char.image_url} alt="" ></img>
                                </Link>
                                <div className="logo-title">
                                    <Link to={{
                                        pathname: `/anime/${char.mal_id}`,
                                        state: {
                                            url: char.url
                                        }
                                    }} >
                                        <h2>{this.parseName(char.title)}</h2>
                                    </Link>

                                </div>
                            </div>
                        ))
                    }
                    {isLoading && <div> Loading Content ... </div>}
                </div >
                {
                    !isLoading && !error &&
                    <button className="load-more-btn" onClick={this.loadMore}>Load More</button>
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    dataList: getData(state),
    error: getError(state),
    isLoading: getPending(state),
    pageNo: getPage(state),
    queryInput: getInput(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData: fetchData,
    fetchMoreData: fetchMoreData,
    fetchCharData: fetchCharData,
    fetchSearchData: fetchSearchData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


