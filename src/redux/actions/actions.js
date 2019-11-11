import React from 'react';
import axios from 'axios';
import {
	FILTER_ADD,
	FILTER_REMOVE,
	GET_POSTS_FAILURE,
	GET_POSTS_STARTED,
	GET_POSTS_SUCCESS,
	GET_INDUSTRY_FAILURE,
	GET_INDUSTRY_STARTED,
	GET_INDUSTRY_SUCCESS,
	GET_RESOURCE_TYPE_FAILURE,
	GET_RESOURCE_TYPE_STARTED,
	GET_RESOURCE_TYPE_SUCCESS,
	GET_SOLUTIONS_FAILURE,
	GET_SOLUTIONS_STARTED,
	GET_SOLUTIONS_SUCCESS,
	GET_INDUSTRY_TERMS_FAILURE,
	GET_INDUSTRY_TERMS_STARTED,
	GET_INDUSTRY_TERMS_SUCCESS,
	GET_RESOURCE_TYPE_TERMS_FAILURE,
	GET_RESOURCE_TYPE_TERMS_STARTED,
	GET_RESOURCE_TYPE_TERMS_SUCCESS,
	GET_SOLUTIONS_TERMS_FAILURE,
	GET_SOLUTIONS_TERMS_STARTED,
	GET_SOLUTIONS_TERMS_SUCCESS
} from "../../constants/constants";
import { wpApi } from "../../api/wordpress";

/**
/* We run our actions in threes from a core action function
/*
/* Each function starts with the 'started' action and sets the state's loading property to 'true'
/* If the API call is successful, it fires the success action and passes the response data to the store
/* If not, the state is updated with the API error message
/* In both cases, the state's loading prop is updated to 'false'
/*
/* You can update the front end with different views depending on the outcome of the state
/*
/* You'll likely never have to deviate from this format, so copy the core GET_POSTS_FAILURE,
/* GET_POSTS_STARTED, GET_POSTS_SUCCESS, rename them appropriately for your action and update vars
/* like apiUrl and the success action parameter to whatever data you're querying
/*
/* For each new action set you create, don't forget to also create the constants for them in the 
/* constants file and include them in the imports block above
/* 
**/
export const getPosts = filterQs => {
	return dispatch => {

		console.log(filterQs);

		const apiUrl = wpApi.listPosts;

		// Actually get the posts
		dispatch(getPostsStarted());

		axios.get(`${apiUrl}`)
			.then(response => {
				dispatch(getPostsSuccess(response.data));
			})
			.catch(error => {
				dispatch(getPostsFailure(error.message));
			});
	}
}

const getPostsStarted = () => ({
	type: GET_POSTS_STARTED
});

const getPostsSuccess = posts => ({
	type: GET_POSTS_SUCCESS,
	payload: { ...posts }
});

const getPostsFailure = error => ({
	type: GET_POSTS_FAILURE,
	payload: { error }
});

export const getTaxIndustry = () => {
	return dispatch => {
		dispatch(getTaxIndustryStarted());

		const apiUrl = wpApi.taxIndustry;

		axios.get(`${apiUrl}`)
			.then(response => {
				dispatch(getTaxIndustrySuccess(response.data))
			})
			.catch(error => {
				dispatch(getTaxIndustryFailure(error.message))
			});
	}
}

const getTaxIndustryStarted = () => ({
	type: GET_INDUSTRY_STARTED
});

const getTaxIndustrySuccess = tax => ({
	type: GET_INDUSTRY_SUCCESS,
	payload: { ...tax }
});

const getTaxIndustryFailure = error => ({
	type: GET_INDUSTRY_FAILURE,
	payload: { error }
});

export const getTaxResourceType = () => {
	return dispatch => {
		dispatch(getTaxResourceTypeStarted());

		const apiUrl = wpApi.taxResourceType;

		axios.get(`${apiUrl}`)
			.then(response => {
				dispatch(getTaxResourceTypeSuccess(response.data))
			})
			.catch(error => {
				dispatch(getTaxResourceTypeFailure(error.message))
			});
	}
}

const getTaxResourceTypeStarted = () => ({
	type: GET_RESOURCE_TYPE_STARTED
});

const getTaxResourceTypeSuccess = tax => ({
	type: GET_RESOURCE_TYPE_SUCCESS,
	payload: { ...tax }
});

const getTaxResourceTypeFailure = error => ({
	type: GET_RESOURCE_TYPE_FAILURE,
	payload: { error }
});

export const getTaxSolution = () => {
	return dispatch => {
		dispatch(getTaxSolutionStarted());

		const apiUrl = wpApi.taxSolution;

		axios.get(`${apiUrl}`)
			.then(response => {
				dispatch(getTaxSolutionSuccess(response.data))
			})
			.catch(error => {
				dispatch(getTaxSolutionFailure(error.message))
			});
	}
}

const getTaxSolutionStarted = () => ({
	type: GET_SOLUTIONS_STARTED
});

const getTaxSolutionSuccess = tax => ({
	type: GET_SOLUTIONS_SUCCESS,
	payload: { ...tax }
});

const getTaxSolutionFailure = error => ({
	type: GET_SOLUTIONS_FAILURE,
	payload: { error }
});

export const getTermsIndustry = () => {
	return dispatch => {
		dispatch(getTermsIndustryStarted());

		const apiUrl = wpApi.termsIndustry;

		axios.get(`${apiUrl}`)
			.then(response => {
				dispatch(getTermsIndustrySuccess(response.data))
			})
			.catch(error => {
				dispatch(getTermsIndustryFailure(error.message))
			});
	}
}

const getTermsIndustryStarted = () => ({
	type: GET_INDUSTRY_TERMS_STARTED
});

const getTermsIndustrySuccess = terms => ({
	type: GET_INDUSTRY_TERMS_SUCCESS,
	payload: { ...terms }
});

const getTermsIndustryFailure = error => ({
	type: GET_INDUSTRY_TERMS_FAILURE,
	payload: { error }
});

export const getTermsResourceType = () => {
	return dispatch => {
		dispatch(getTermsResourceTypeStarted());

		const apiUrl = wpApi.termsResourceType;

		axios.get(`${apiUrl}`)
			.then(response => {
				dispatch(getTermsResourceTypeSuccess(response.data))
			})
			.catch(error => {
				dispatch(getTermsResourceTypeFailure(error.message))
			});
	}
}

const getTermsResourceTypeStarted = () => ({
	type: GET_RESOURCE_TYPE_TERMS_STARTED
});

const getTermsResourceTypeSuccess = terms => ({
	type: GET_RESOURCE_TYPE_TERMS_SUCCESS,
	payload: { ...terms }
});

const getTermsResourceTypeFailure = error => ({
	type: GET_RESOURCE_TYPE_TERMS_FAILURE,
	payload: { error }
});

export const getTermsSolution = () => {
	return dispatch => {
		dispatch(getTermsSolutionStarted());

		const apiUrl = wpApi.termsSolution;

		axios.get(`${apiUrl}`)
			.then(response => {
				dispatch(getTermsSolutionSuccess(response.data))
			})
			.catch(error => {
				dispatch(getTermsSolutionFailure(error.message))
			});
	}
}

const getTermsSolutionStarted = () => ({
	type: GET_SOLUTIONS_TERMS_STARTED
});

const getTermsSolutionSuccess = terms => ({
	type: GET_SOLUTIONS_TERMS_SUCCESS,
	payload: { ...terms }
});

const getTermsSolutionFailure = error => ({
	type: GET_SOLUTIONS_TERMS_FAILURE,
	payload: { error }
});

export const filterUpdate = filterParams => {
	return dispatch => {
		if (filterParams.checkedStatus === true) {
			dispatch(addFilter(filterParams));
		} else {
			dispatch(removeFilter(filterParams));
		}
	}
}

const addFilter = filterParams => ({
	type: FILTER_ADD,
	payload: { ...filterParams }
});

const removeFilter = filterParams => ({
	type: FILTER_REMOVE,
	payload: { ...filterParams }
});