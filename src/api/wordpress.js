// Set some constants related to the Wordpress post types we want to display

import {
	API_URL
} from "../constants/constants";

/**
/* Set the endpoints for the WP posts, post types, and/or taxonomies that we'll be querying
/* The endpoint is looking for the post type or taxonomy ID
/*
/* _embed=1 will include custom fields and taxonomies associated with your post type
/* otherwise, the API response will omit that data
**/
export const wpApi = {
	listPosts: API_URL + 'cpt_5?_embed=1',
	termsResourceType: API_URL + 'all-terms?term=tax_11',
	termsIndustry: API_URL + 'all-terms?term=tax_8',
	termsSolution: API_URL + 'all-terms?term=tax_14',
	taxResourceType: API_URL + 'taxonomies/tax_11',
	taxIndustry: API_URL + 'taxonomies/tax_8',
	taxSolution: API_URL + 'taxonomies/tax_14'
}