tddjs.noop = function(){};

(function(){
    var ajax = tddjs.namespace("ajax");

    if(!ajax.create){
	return;
    }

    function isSuccess(transport){
	var status = transport.status;

	return (status >= 200 && status < 300) ||
	    status == 304 || 
	    (tddjs.isLocal() && !status);
    }

    function requestComplete(transport,options){
	if(isSuccess(transport)){
	    if(typeof options.success == "function"){
		options.success(transport);
	    }
	}else{
	    if(typeof options.failure == "function"){
		options.failure(transport);
	    }
	}
    }

    function setData(options){
	if(options.data){
	    options.data = tddjs.util.urlParams(options.data);

	    if(options.method == "GET"){
		options.url += "?" + options.data; 
		options.data = null;
	    }   
	}else{
	    options.data = null;
	} 
    }

    function request(url,options){
	if(typeof url != "string"){
	    throw new TypeError("URL should be string");
	}

	options = options || {};
	options = tddjs.extend({},options);
	options.url = url;
	setData(options);
	var data = null;
	if(options.method == "POST"){
	    data = options.data;
	}

	var transport = ajax.create();
	
	transport.open(options.method || "GET",options.url,true);

	transport.onreadystatechange = function(){
	    if(transport.readyState == 4){
		requestComplete(transport,options);
		transport.onreadystatechange = tddjs.noop;
	    }
	};

	transport.send(options.data);
    }

    function get(url,options){
	options = tddjs.extend({},options);;
	options.method = "GET";
	ajax.request(url,options);
    }

    function post(url,options){
	options = tddjs.extend({},options);
	options.method = "POST";
	ajax.request(url,options);
    }

    ajax.get = get;
    ajax.post = post;
    ajax.request = request;
}());