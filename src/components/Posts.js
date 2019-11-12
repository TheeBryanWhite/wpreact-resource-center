import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPostsFailure,
    getPostsSuccess,
    getPostsStarted
} from '../redux/reducers/reducer';
import { 
    getPosts
} from "../redux/actions/actions";

const mapStateToProps = state => ({
    postsError: getPostsFailure(state),
    postsLoading: getPostsStarted(state),
    posts: getPostsSuccess(state)
});

const mapDispatchToProps = { 
    getPosts
}

class ConnectedPosts extends Component {

    constructor(props) {
        super(props);

        this.createMarkup = this.createMarkup.bind(this);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentDidMount() {
        const { 
            getPosts,
        } = this.props;


        getPosts();
    }

    shouldComponentRender() {

        const { 
            postsLoading,
        } = this.props;
        
        if (postsLoading === false) {
            return false;
        }

        return true;
    }

    // Some of the API data from WordPress renders as text, tags and all
    // Run that business through this function to render it as markup
    createMarkup(html) {
        return { __html: html };
    }

	render() {
        const postsData = [];

        const { 
            posts
         } = this.props;

        for (var key in posts) {
            postsData.push(posts[key]);
        }

        if (this.shouldComponentRender()) {
            return "Loading...";
        }

        if (postsData.length === 0) {
            return "There are no posts";
        }

		return(
			<div className="posts-container">
                {postsData.map(el => (
                <div className="post-container" key={el.id}>
                    <h3><strong><a href={el.link}>{el.title.rendered}</a></strong></h3>
                    {el._embedded['wp:term'].map(terms => (
                        terms.map((term, index) => (
                            <p key={index}>{term.name}</p>
                        ))
                    ))}
                    <div className="post-excerpt" dangerouslySetInnerHTML={this.createMarkup(el.excerpt.rendered)} />
                </div>
                ))}
            </div>
		)
	}

}

const Posts = connect(
    mapStateToProps, 
    mapDispatchToProps
)(ConnectedPosts);

export default Posts;