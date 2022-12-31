const { auth } = require("../firebase");

const login = async (email, password, response) => {
    const credential = await auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                console.log('Wrong password');
                response.status(401).send();
            } else {
                console.log(errorMessage);
                response.status(401).send();
            }
            console.log(error);
        });
    
    response.json(credential);
}

module.exports = { login }