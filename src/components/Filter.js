import React, { Component } from 'react';
import { connect } from "react-redux";
import { filterStatus } from '../redux/reducers/reducer';
import { filterUpdate } from "../redux/actions/actions";

const mapStateToProps = state => ({
	getFilters: filterStatus(state)
})

const mapDispatchToProps = {
	filterUpdate
}

class ConnectedFilter extends Component {

	constructor(props) {
		super(props);
	
		this.changeHandler = this.changeHandler.bind(this);
	}

	changeHandler (event) {
		const checkedStatus = event.currentTarget.checked;
		const selectedTaxonomy = event.currentTarget.name;
    	const termId = event.currentTarget.value;

    	const paramsToSend = {
    		checkedStatus: checkedStatus,
    		selectedTaxonomy: selectedTaxonomy,
    		termId: termId
    	};

    	const filterUpdatePromise = new Promise((resolve, reject) => {
    		this.props.filterUpdate(paramsToSend);
    		resolve(true);
    	});

		filterUpdatePromise.then(() => console.log(this.props.getFilters))    	
    }

    render() {

    	const taxData = [];
    	const termsData = [];
    	const taxonomy = this.props.taxonomy;
    	const terms = this.props.terms;

        for (var taxKey in taxonomy) {
            taxData.push(taxonomy[taxKey]);
        }

        for (var termsKey in terms) {
            termsData.push(terms[termsKey]);
        }

    	return (
    		<div className="terms-filter filter" id={taxData[1]}>
            {termsData.map((el, index) => (
                <div key={index}>
                <input type="checkbox" id={el.slug} name={taxData[1]} value={el.term_id} onChange={this.changeHandler}></input>
                <label htmlFor={el.slug} key={index}>{el.name}</label>
                </div>
            ))}
            </div>
    	)
    }

}

const Filter = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedFilter);

export default Filter;