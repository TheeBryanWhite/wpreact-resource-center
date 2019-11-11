import React, { Component } from 'react';

class Posts extends Component {

    constructor() {
        super();

        this.createMarkup = this.createMarkup.bind(this);
    }

    // Some of the API data from WordPress renders as text, tags and all
    // Run that business through this function to render it as markup
    createMarkup(html) {
        return { __html: html };
    }

	render() {
        const postsData = [];
		const posts = this.props.posts;

        for (var key in posts) {
            postsData.push(posts[key]);
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

export default Posts;