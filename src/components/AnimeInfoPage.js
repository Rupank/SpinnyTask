import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCharInfo } from '../reducers/productReducer';
import { fetchCharData } from '../actions/productActions';


function AnimeInfoPage(props) {
    console.log(props.location.state.url);
    const { fetchCharData, infoHTML } = props;
    useEffect(() => {
        fetchCharData(props.location.state.url)
    }, [])
    return (
        <div dangerouslySetInnerHTML={{ __html: infoHTML }} />
    )
}
const mapStateToProps = (state) => ({
    infoHTML: getCharInfo(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCharData: fetchCharData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimeInfoPage);
