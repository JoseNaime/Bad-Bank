import React from 'react';

function UserLoginCard({user, userContext, setUserContext}) {
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const currentUserActive = userContext.currentUser === user.id;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === user.password) {
            setError('');
            setUserContext({
                currentUser: user.id, users: [...userContext.users]
            })
        } else {
            setError('Incorrect password');
        }
        setPassword('');
    }
    return (
        <div className={`card transition-all-500ms ${currentUserActive && "bg-primary text-white"}`}>
        <form className="card-body" onSubmit={handleSubmit}>
            <h5 className="card-title">{user.username}</h5>
            <h6 className={`card-subtitle mb-4 ${currentUserActive ? "text-white" : "text-muted"}`}>{user.email}</h6>
            <div className="mb-3">
                <label>Password: </label>
                <input type="password" className="form-control " name="password"
                       value={password} onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => setPassword("")}/>
                <p className="fs-8 fw-light text-danger "> {error}</p>
            </div>
            <button disabled={currentUserActive} className="btn btn-primary" style={{width: "100%"}} type="submit">Login</button>
        </form>
    </div>);
}

export default UserLoginCard;