import React, {useState, useEffect} from 'react';
import {UserContext} from "../App";
import UserInfo from "./UserInfo";

function AllData() {
    const {userContext, setUserContext} = React.useContext(UserContext);
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        // fetch all data from API
        fetch('/account/all')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
                setUser(data[userContext.currentUser])
            })
    }, []);
    

    const OthersUserData = () => {

        const users = data.map(user => {
            return (
                <UserInfo key={"user_data_" + user.id} user={user} />
            )
        })

        return (
            <div>
                <h3 className="text-center">All Users Data</h3>
                <div className="d-grid gap-4">
                    {users}
                </div>
            </div>
        )

    }

    return (
        <>
            <h1>All Data</h1>

            <div className="card">
                <div className="card-body">
                    <h3 className="text-center">Current User Data</h3>
                    <div className={"mb-5"}>
                        {user ?
                            <UserInfo user={user} />
                            :
                            <h5>User not found</h5>
                        }
                    </div>
                    <div>
                        {data.length > 1 &&

                            <OthersUserData />
                        }
                    </div>
                </div>
            </div>

            <div className="mt-4 ">
                <h6 className="card-title text-center">Raw Data</h6>
                <p className="text-muted text-wrap w-100 text-break">{JSON.stringify(data)}</p>
            </div>


        </>
    );
}

export default AllData;