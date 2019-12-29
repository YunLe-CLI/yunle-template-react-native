import stacktraceParser from 'stacktrace-parser';


const parseErrorStack = (error) => {
    if (!error || !error.stack) {
        return [];
    }
    return Array.isArray(error.stack) ? error.stack :
        stacktraceParser.parse(error.stack);
};


// intercept react-native error handling
if (ErrorUtils._globalHandler) {
    this.defaultHandler = (ErrorUtils.getGlobalHandler
        && ErrorUtils.getGlobalHandler())
        || ErrorUtils._globalHandler;
    ErrorUtils.setGlobalHandler(this.wrapGlobalHandler); // feed errors directly to our wrapGlobalHandler function
}

async function wrapGlobalHandler(error, isFatal) {

    const stack = parseErrorStack(error);

    //do anything with the error here
    alert(JSON.stringify(error))
    this.defaultHandler(error, isFatal);  //after you're finished, call the defaultHandler so that react-native also gets the error
}