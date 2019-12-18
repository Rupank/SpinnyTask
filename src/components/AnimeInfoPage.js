import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCharInfo, getError, getPending } from '../reducers/productReducer';
import { fetchCharData } from '../actions/productActions';


function AnimeInfoPage(props) {
    const { fetchCharData, infoHTML, error, isLoading } = props;
    useEffect(() => {
        fetchCharData(props.location.state.url)
    }, [])
    return (
        <div>
            {error && <div>{error}</div>}
            {isLoading && <div>Lodaing...</div>}
            <div dangerouslySetInnerHTML={{ __html: infoHTML }} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    infoHTML: getCharInfo(state),
    error: getError(state),
    isLoading: getPending(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCharData: fetchCharData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimeInfoPage);
