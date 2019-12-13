import React, { Component } from 'react'
import axios from 'axios';
import '../App.css'
const BASE_URL = 'https://api.jikan.moe/v3/search/anime?q=naruto&limit=16';
class Homepage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            chars: [],
            error: null,
            pageNo: 1
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            let { data } = await axios(`${BASE_URL}&page=${this.state.pageNo}`);
            this.setState({
                isLoading: false,
                chars: [...this.state.chars, ...data.results]
            });
        } catch (error) {
            this.setState({
                isLoading: false,
                error: error.message
            })
        }
    }

    loadMore = () => {
        this.setState({
            ...this.state,
            pageNo: this.state.pageNo + 1
        }, () => {
            this.fetchData();
        });
    }

    parseName(name) {
        if (name.length > 25) {
            name = name.substring(0, 23) + '...';
        }
        return name;
    }

    render() {
        console.log(this.state.chars);
        return (
            <div>
                {
                    this.state.error && <div>{this.state.error}</div>
                }
                <div className="list">
                    {
                        this.state.chars.map(char => (
                            <div className="charDiv" key={char.title}>
                                <img src={char.image_url} alt="" ></img>
                                <div className="logo-title">
                                    <h2>{this.parseName(char.title)}</h2>
                                </div>
                            </div>
                        ))
                    }
                    {this.state.isLoading && <div> Loading Content ... </div>}
                </div>
                {
                    !this.state.isLoading && !this.state.error &&
                    < button onClick={this.loadMore}>Load More</button>
                }
            </div>
        )
    }
}

export default Homepage
