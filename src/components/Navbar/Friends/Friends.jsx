import React from 'react';
import FriendsOnline from './FriendsOnline/FriendsOnline';

const Friends = (props) => {
    let friend = props.friends.map(p => <FriendsOnline state={p} key={p.id}/> )
        return (
        <div>
            <div >{friend}</div>
        </div>
     ) 
   
}

export default Friends