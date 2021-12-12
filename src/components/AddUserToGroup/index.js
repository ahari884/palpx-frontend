import React, { useEffect, useState } from 'react'
import axiosConfig from '../../axiosGlobalConfig'
import { Input, InputContainer } from '../../style'
import { UsernameSelection } from './style'

const AddUserToGroup = ({group}) => {

    const [searchKey, setSearchKey] = useState('')
    const [users, setUsers] = useState([])
    const [successMessage, setSuccessMessage] = useState('')

    const fetchUsers = ()=>{
        axiosConfig.get(`/users?searchKey=${searchKey}`).then((response)=>{
            console.log('Response', response)
            setUsers(response.data || [])
        }).catch((e)=>{
            setUsers([])
        })
    }

    const addUserToGroup = (user) => {
        axiosConfig.post(`/groups/${group._id}`, {
            username: user.username
        }).then((response) => {
            setSuccessMessage(`${user.username} addded to group successfully`)
        })
    }

    return(
        <div>
            <InputContainer>
                <Input 
                    type="text"
                    value={searchKey}
                    onChange={(e)=> setSearchKey(e.target.value)}
                    onKeyDown={fetchUsers}
                />
            </InputContainer>
            <InputContainer>
                <span style={{color: 'white', backgroundColor: 'lightgreen'}}>{successMessage || null}</span>
            </InputContainer>
            <InputContainer>
                {
                    users.map((user) => {
                        return(
                            <div>
                                <UsernameSelection onClick={()=> addUserToGroup(user)}>
                                    {user.username}
                                </UsernameSelection>
                            </div>
                        )
                    })
                }
            </InputContainer>
        </div>
    )
}

export default AddUserToGroup
