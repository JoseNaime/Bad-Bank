import React, {useReducer} from 'react';

const initialState = {
    username: "", email: "", password: "", errors: {"username": "", "email": "", "password": ""},
};

function CreateAccountForm({setCreatingAccount, userContext, setUserContext}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [submitIsDisabled, setSubmitIsDisabled] = React.useState(true);

    function reducer(state, action) {
        switch (action.type) {
            case "Field Change":
                return {...state, [action.name]: action.value};
            case "Form Error":
                return {...state, errors: {...state.errors, [action.field]: action.message}};
            case "Clear Form Error":
                return {...state, errors: {...state.errors, [action.field]: ""}};
            default:
                return state;
        }
    }

    function handleSubmitForm(event) {
        console.log(state)
        event.preventDefault()

        const url = `/account/create/${state.username}/${state.email}/${state.password}`;

        const user = {id: userContext.users.length, ...state, balance: 0, deposits: [], withdraws: []};

        fetch(url, {method: "POST"})
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    delete user.errors
                    setUserContext({
                        currentUser: user.id, users: [...userContext.users, user]
                    })
                    setCreatingAccount(false);
                    console.log(user);
                } else {
                    alert("Error when creating user");
                }
            })
            .catch(error => console.log(error));
    }

    function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        dispatch({type: "Field Change", name, value});
    }

    function isThereAnyFormError() {
        return !Object.values(state.errors).some(error => error !== "");
    }

    function validateField(fieldName, value) {
        console.log(fieldName, value.length);
        switch (fieldName) {
            case "username":
                if (value.length === 0) dispatch({
                    type: "Form Error",
                    field: fieldName,
                    message: "Please enter a username."
                });
                else if (value.length < 3) dispatch({
                    type: "Form Error",
                    field: fieldName,
                    message: "Username must be at least 3 characters."
                });
                else if (value.length > 20) dispatch({
                    type: "Form Error",
                    field: fieldName,
                    message: "Username must be less than 20 characters."
                });
                break;
            case "email":
                if (value.length === 0) dispatch({
                    type: "Form Error",
                    field: fieldName,
                    message: "Please enter an email."
                });
                else if (!value.includes("@")) dispatch({
                    type: "Form Error",
                    field: fieldName,
                    message: "Please enter a valid email."
                });

                break;
            case "password":
                if (value.length === 0) dispatch({
                    type: "Form Error",
                    field: fieldName,
                    message: "Please enter a password."
                });
                else if (value.length < 8) dispatch({
                    type: "Form Error",
                    field: fieldName,
                    message: "Password must be at least 8 characters."
                });

                break;
        }
    }

    return (
        <div>
            <h1 className="card-title mb-3 text-center">Create Account</h1>
            <form className="form" style={{width: "350px", margin: "auto"}} onSubmit={handleSubmitForm}>
                <div className="form-group">
                    <label className="fw-bold" aria-labelledby="username">Username</label>
                    <input type="name"
                           data-testid="username-input"
                           className="form-control"
                           name="username"
                           value={state.username}
                           onChange={(e) => handleInputChange(e)}
                           onBlur={(e) => validateField("username", e.target.value)}
                           onFocus={() => dispatch({type: "Clear Form Error", field: "username"})}
                    />
                    {state.errors["username"] ?
                        <p className="fs-8 fw-light text-danger">{state.errors["username"]}</p> : ""}
                </div>
                <div className="form-group">
                    <label className="fw-bold">Email</label>
                    <input type="text"
                           data-testid="email-input"
                           className="form-control"
                           name="email"
                           value={state.email}
                           onChange={(e) => handleInputChange(e)}
                           onBlur={(e) => validateField("email", e.target.value)}
                           onFocus={() => dispatch({type: "Clear Form Error", field: "email"})}
                    />
                    {state.errors["email"] ? <p className="fs-8 fw-light text-danger">{state.errors["email"]}</p> : ""}
                </div>
                <div className="form-group">
                    <label className="fw-bold">Password</label>
                    <input type="password"
                           data-testid="password-input"
                           className="form-control"
                           name="password"
                           value={state.password}
                           onChange={(e) => handleInputChange(e)}
                           onBlur={(e) => validateField("password", e.target.value)}
                           onFocus={() => dispatch({type: "Clear Form Error", field: "password"})}
                    />
                    {state.errors["password"] ?
                        <p className="fs-8 fw-light text-danger">{state.errors["password"]}</p> : ""}
                </div>
                <button disabled={(!isThereAnyFormError() || state.name === "" || state.email === "" || state.password === "")}
                        data-testid="create-account-button"
                        type="submit"
                        className="btn btn-primary">Create
                                                    Account
                </button>
            </form>
        </div>
    );
}

export default CreateAccountForm;