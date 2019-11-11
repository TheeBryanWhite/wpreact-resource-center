import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import Posts from './Posts';
import {
    getPostsFailure,
    getPostsSuccess,
    getPostsStarted,
    getTaxIndustryFailure, 
    getTaxIndustrySuccess, 
    getTaxIndustryStarted,
    getTaxResourceTypeFailure, 
    getTaxResourceTypeSuccess, 
    getTaxResourceTypeStarted,
    getTaxSolutionsFailure, 
    getTaxSolutionsSuccess, 
    getTaxSolutionsStarted,
    getTermsIndustryFailure, 
    getTermsIndustrySuccess, 
    getTermsIndustryStarted,
    getTermsResourceTypeFailure, 
    getTermsResourceTypeSuccess, 
    getTermsResourceTypeStarted,
    getTermsSolutionsFailure, 
    getTermsSolutionsSuccess, 
    getTermsSolutionsStarted
} from '../redux/reducers/reducer';
import { 
    getPosts,
    getTaxIndustry,
    getTaxResourceType,
    getTaxSolution,
    getTermsIndustry,
    getTermsResourceType,
    getTermsSolution
} from "../redux/actions/actions";

// Update the mapStateToProps object with state data for each set of queried data you pull down from WordPress
const mapStateToProps = state => ({
    postsError: getPostsFailure(state),
    postsLoading: getPostsStarted(state),
    posts: getPostsSuccess(state),
    taxIndustryError: getTaxIndustryFailure(state),
    taxIndustryLoading: getTaxIndustryStarted(state),
    taxIndustry: getTaxIndustrySuccess(state),
    taxResourceTypeError: getTaxResourceTypeFailure(state),
    taxResourceTypeLoading: getTaxResourceTypeStarted(state),
    taxResourceType: getTaxResourceTypeSuccess(state),
    taxSolutionsError: getTaxSolutionsFailure(state),
    taxSolutionsLoading: getTaxSolutionsStarted(state),
    taxSolutions: getTaxSolutionsSuccess(state),
    termsIndustryError: getTermsIndustryFailure(state),
    termsIndustryLoading: getTermsIndustryStarted(state),
    termsIndustry: getTermsIndustrySuccess(state),
    termsResourceTypeError: getTermsResourceTypeFailure(state),
    termsResourceTypeLoading: getTermsResourceTypeStarted(state),
    termsResourceType: getTermsResourceTypeSuccess(state),
    termsSolutionsError: getTermsSolutionsFailure(state),
    termsSolutionsLoading: getTermsSolutionsStarted(state),
    termsSolutions: getTermsSolutionsSuccess(state)
})

const mapDispatchToProps = { 
    getPosts,
    getTaxIndustry,
    getTaxResourceType,
    getTaxSolution,
    getTermsIndustry,
    getTermsResourceType,
    getTermsSolution
}

class ConnectedResourceList extends Component {

	constructor(props) {

        super(props);

        this.shouldComponentRender = this.shouldComponentRender.bind(this);

    }

    componentDidMount() {
        const { 
            getPosts,
            getTaxIndustry,
            getTaxResourceType,
            getTaxSolution,
            getTermsIndustry,
            getTermsResourceType,
            getTermsSolution
        } = this.props;

        getPosts();
        getTaxIndustry();
        getTaxResourceType();
        getTaxSolution();
        getTermsIndustry();
        getTermsResourceType();
        getTermsSolution();
    }

    // Check to make sure the data is loaded
    // If loading === true, you can display a loading message or a spinner or something
    shouldComponentRender() {

        const { 
            postsLoading,
            industryTaxLoading,
            resourceTypeTaxLoading,
            solutionsTaxLoading,
            industryTermsLoading,
            resourceTypeTermsLoading,
            solutionsTermsLoading
        } = this.props;
        
        if (postsLoading === false) {
            return false;
        }

        if (industryTaxLoading === false) {
            return false;
        }

        if (resourceTypeTaxLoading === false) {
            return false;
        }

        if (solutionsTaxLoading === false) {
            return false;
        }

        if (industryTermsLoading === false) {
            return false;
        }

        if (resourceTypeTermsLoading === false) {
            return false;
        }

        if (solutionsTermsLoading === false) {
            return false;
        }

        return true;
    }

    render() {

        const { 
            posts,
            taxIndustry,
            taxResourceType,
            taxSolutions,
            termsIndustry,
            termsResourceType,
            termsSolutions
         } = this.props;

        if (this.shouldComponentRender()) {
            return "Loading...";
        }

    	return(
            <div className="resource-center-container">
                <Filter taxonomy={taxIndustry} terms={termsIndustry} />

                <Filter taxonomy={taxResourceType} terms={termsResourceType} />

                <Filter taxonomy={taxSolutions} terms={termsSolutions} />

                <Posts posts={posts} />
            </div>
    	)
    }

}

const ResourceList = connect(
    mapStateToProps, 
    mapDispatchToProps
)(ConnectedResourceList);

export default ResourceList;