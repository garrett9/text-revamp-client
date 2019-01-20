'use strict';

/**
 * Creates a new TextRevampClient instance.
 * 
 * @param {string} companyId - The ID of the company to add contacts to.
 */
function TextRevampClient(companyId, params) {
	this.companyId = companyId;
	this.params = typeof params === 'object' ? params : {};
	this.basePath = typeof this.params.basePath === 'string' ? this.params.basePath : 'https://textrevamp.com';
}

/**
 * Bind a form to the subscribing of a new client.
 * 
 * @param {string} query - The query string selector for the form to bind the client to.
 * @param {Object} [parameters] - Optional parameters
 * @param {string} [parameters.group_id] - Optional group ID to add the contact to.
 * @param {Function} [parameters.onSubmit] - A callback to execute as soon as the form that the client is bound to is submitted, but before the AJAX request fires.
 * @param {Function} [parameters.onSuccess] - A callback to execute on a successful ajax request.
 * @param {Function} [parameters.onError] - A callback to execute on an error.
 */
TextRevampClient.prototype.bind = function(query, parameters) {
	var _this = this;
	var params = typeof parameters === 'object' ? parameters : {};
	var form = document.querySelector(query);
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		if(typeof params.onSubmit === 'function') {
			params.onSubmit();
		}
		var data = new FormData(form);
		_this.subscribe(data.get('phone').replace(/[^0-9]/g, ''), {
			first_name: data.get('first_name'),
			last_name: data.get('last_name'),
			group_id: params.group_id,
			onSuccess: params.onSuccess,
			onError: params.onError
		});
	}, false);
}

/**
 * Add a contact to a the client's associated company.
 * 
 * @param {string} phoneNumber - The phone number to add to the company.
 * @param {Object} [parameters] - Optional parameters
 * @param {string} [parameters.first_name] - Optional first name to associate with the contact
 * @param {string} [parameters.last_name] - Optional last name to associate with the contact.
 * @param {string} [parameters.group_id] - Optional group ID to add the contact to.
 * @param {Function} [parameters.onSuccess] - A callback to execute on a successful ajax request.
 * @param {Function} [parameters.onError] - A callback to execute on an error.
 */
TextRevampClient.prototype.subscribe = function(phoneNumber, parameters) {
	var params = typeof parameters === 'object' ? parameters : {};
	var xhr = new XMLHttpRequest();
	xhr.open('POST', this.basePath + '/api/v1/contacts');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Accept', 'application/json' );
	var data = {};
	data.company_id = this.companyId;
	data.phone = phoneNumber;
	data.first_name = params.first_name;
	data.last_name = params.last_name;
	data.folder_id = params.group_id;

	xhr.onload = function() {
		if(xhr.status >= 200 && xhr.status < 300) {
			if(typeof params.onSuccess === 'function') {
				params.onSuccess(xhr.response);
			}
		} else {
			if(typeof params.onError === 'function') {
				params.onError(xhr.response);
			}
		}
	}

	xhr.send(JSON.stringify(data));
}

module.exports = TextRevampClient;