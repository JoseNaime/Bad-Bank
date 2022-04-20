import React from 'react';
import {UserContext} from '../App'
import CreateAccountForm from "./CreateAccountForm";
import UserLoginCard from "./UserLoginCard";


function CreateAccount() {
    const {userContext, setUserContext} = React.useContext(UserContext);
    const [creatingAccount, setCreatingAccount] = React.useState(false);


    return (<>
        {(userContext.currentUser !== null && !creatingAccount)
            ?
            <div className="card" style={{width: '50%', margin: "auto"}}>
                <div className="card-body text-center">
                    <h1 className="card-title mb-3">Create Account</h1>
                    <h5 className="card-subtitle mb-4">Currently loged
                                                       in: {userContext.users[userContext.currentUser].username}</h5>
                    <button className="btn btn-primary mb-3" onClick={() => setCreatingAccount(true)}>Create Another Account
                    </button>
                </div>
            </div>
            :
            <CreateAccountForm setCreatingAccount={setCreatingAccount}
                               userContext={userContext}
                               setUserContext={setUserContext} />
        }

        {(userContext.users.length > 1 && !creatingAccount) &&
            <div id="user-login-cards-grid">
                {
                    userContext.users.map((user) => {
                        return <UserLoginCard user={user} userContext={userContext} setUserContext={setUserContext} />
                    })
                }
            </div>
        }


    </>);
}

export default CreateAccount;