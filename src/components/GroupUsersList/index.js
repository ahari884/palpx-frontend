import React, { useEffect, useState } from 'react'
import axiosConfig from '../../axiosGlobalConfig'
import { RemoveUser, UsernameWrapper } from './style'

const GroupUsersList = ({ group }) => {

    const [groupUsers, setGroupUsers] = useState([])
    const [isGroupUsersFetched, setGroupUsersFetched] = useState(false)
    
    const fetchGroupUsers = () => {
        axiosConfig.get(`/groups/${group._id}`).then((response)=>{
            setGroupUsers(response.data?.users || [])
            setGroupUsersFetched(true)
        }).catch((e)=> {})
    }

    useEffect(()=>{
        if(!isGroupUsersFetched) {
            fetchGroupUsers()
        }
    })

    const removeUser = (user) => {
        axiosConfig.delete(`/groups/${user.groupId}/users/${user.username}`)
            .then((response)=>{
                let filteredUsers = groupUsers.filter((gUser) => gUser.username !== user.username)
                setGroupUsers(filteredUsers)
            })
    }

    return (
        <div>
            {
                groupUsers.map((groupUser)=>{
                    return(
                        <UsernameWrapper>
                            {groupUser?.username} <RemoveUser onClick={()=>removeUser(groupUser)}> x </RemoveUser>
                        </UsernameWrapper>
                    )
                })
            }
        </div>
    )


}

export default GroupUsersList
