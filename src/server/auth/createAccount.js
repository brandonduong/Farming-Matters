const { auth } = require("../firebase");

const createAccount = async (email, password, response) => {
    const credential = await auth.createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                console.log('Email in use');
                response.status(401).send();
            } else {
                console.log(errorMessage);
                response.status(401).send();
            }
            console.log(error);
        });
    
    response.json(credential);
}

module.exports = { createAccount }