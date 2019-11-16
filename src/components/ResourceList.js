import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import Posts from './Posts';
import {
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
    getTermsSolutionsStarted,
    totalPosts
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
import { postQuerySettings } from "../api/wordpress";
import ReactPaginate from 'react-paginate';

// Update the mapStateToProps object with state data for each set of queried data you pull down from WordPress
const mapStateToProps = state => ({
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
    termsSolutions: getTermsSolutionsSuccess(state),
    totalPosts: totalPosts(state)
});

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
    
      this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        const { 
            getTaxIndustry,
            getTaxResourceType,
            getTaxSolution,
            getTermsIndustry,
            getTermsResourceType,
            getTermsSolution
        } = this.props;

        getTaxIndustry();
        getTaxResourceType();
        getTaxSolution();
        getTermsIndustry();
        getTermsResourceType();
        getTermsSolution();
    }

    clickHandler = event => {
        const { getPosts } = this.props;
        let selected = event.selected + 1;

        getPosts(selected);
    }

    render() {

        const { 
            taxIndustry,
            taxResourceType,
            taxSolutions,
            termsIndustry,
            termsResourceType,
            termsSolutions,
            totalPosts
         } = this.props;

        // Add elements to this as needed but keep .react-enclosure and the components as they are essential
    	return(
            <div className="resource-center-container react-enclosure">
                <Filter taxonomy={taxIndustry} terms={termsIndustry} />

                <Filter taxonomy={taxResourceType} terms={termsResourceType} />

                <Filter taxonomy={taxSolutions} terms={termsSolutions} />

                <Posts />

                <ReactPaginate 
                    activeClassName={'active'}
                    containerClassName={'pagination'}
                    marginPagesDisplayed={postQuerySettings.marginDisplayed}
                    onPageChange={this.clickHandler}
                    PageCount={postQuerySettings.totalPosts}
                    pageRangeDisplayed={postQuerySettings.rangeDisplayed}
                    subContainerClassName={'pages pagination'}
                />
            </div>
    	)
    }

}

const ResourceList = connect(
    mapStateToProps, 
    mapDispatchToProps
)(ConnectedResourceList);

export default ResourceList;