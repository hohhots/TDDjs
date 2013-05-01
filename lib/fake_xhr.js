var fakeXMLHttpRequest = {
    open:stubFn(),
    send:stubFn(),

    setRequestHeader:function(){
	if(!this.headers){
	    this.headers = {};
	}

	this.headers[header] = value;
    },

    readyStateChange:function(readyState){
	this.readyState = readyState;
	this.onreadystatechange();
    }
};