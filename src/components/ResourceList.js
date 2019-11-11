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
    getTermsSolutionsStarted
} from '../redux/reducers/reducer';
import { 
    getTaxIndustry,
    getTaxResourceType,
    getTaxSolution,
    getTermsIndustry,
    getTermsResourceType,
    getTermsSolution
} from "../redux/actions/actions";

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
    termsSolutions: getTermsSolutionsSuccess(state)
});

const mapDispatchToProps = { 
    getTaxIndustry,
    getTaxResourceType,
    getTaxSolution,
    getTermsIndustry,
    getTermsResourceType,
    getTermsSolution
}

class ConnectedResourceList extends Component {

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

    render() {

        const { 
            taxIndustry,
            taxResourceType,
            taxSolutions,
            termsIndustry,
            termsResourceType,
            termsSolutions
         } = this.props;

    	return(
            <div className="resource-center-container">
                <Filter taxonomy={taxIndustry} terms={termsIndustry} />

                <Filter taxonomy={taxResourceType} terms={termsResourceType} />

                <Filter taxonomy={taxSolutions} terms={termsSolutions} />

                <Posts />
            </div>
    	)
    }

}

const ResourceList = connect(
    mapStateToProps, 
    mapDispatchToProps
)(ConnectedResourceList);

export default ResourceList;