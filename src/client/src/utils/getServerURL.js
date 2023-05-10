export const getServerURL = () => {
    let fullURL;
    console.log(process.env.NODE_ENV)

    if (process.env.NODE_ENV === 'production') {
        // Production URL
        fullURL = process.env.REACT_APP_SERVER_HOST + process.env.REACT_APP_SERVER_PATH
        return {
            url: fullURL,
            host: process.env.REACT_APP_SERVER_HOST,
        }
    } else {
        // Dev URL
        fullURL = process.env.REACT_APP_LOCAL_URL + process.env.REACT_APP_SERVER_PATH
        return {
            url: fullURL,
            host: process.env.REACT_APP_LOCAL_URL,
        }
    }
}