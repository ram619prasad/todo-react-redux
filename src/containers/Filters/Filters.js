import React, { Component } from 'react';
import FilterLink from '../../components/FilterLink/FilterLink';
import Styles from './Filters.css';

class Filters extends Component {
    render() {
        let filterLinks = <ul className={Styles.Filters} >
            {this.props.filters.map((filter) => {
                return (<FilterLink linkName={filter} key={filter} />)
            })}
        </ ul>

        return (
            filterLinks
        );
    };
};

export default Filters;