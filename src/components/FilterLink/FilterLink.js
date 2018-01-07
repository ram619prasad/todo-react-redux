import React from 'react';
import Styles from './FilterLink.css';


const FilterLink = ({linkName}) => {
    return (
        <li key={linkName} className={Styles.FilterListItem} >
            <a href="#" className={Styles.FilterLink}>{linkName}</a>
        </li>
    );
};

export default FilterLink;