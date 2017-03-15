import fetch from 'isomorphic-fetch';
import config from '../config/config.js';

export const fetchIndex = (data) => {
	return (dispatch) => {
		return fetch(config.api.list).then(res => res.json()).then(json => dispatch({
		    	data: json
		  	})
		);
	}
}