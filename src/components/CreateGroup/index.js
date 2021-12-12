import React, { useState } from 'react'
import axiosConfig from '../../axiosGlobalConfig'
import { Input, InputContainer } from '../../style'

const CreateGroup = ({ fetchGroups }) => {

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const onSubmit = () => {
        axiosConfig.post('/groups', {
            name
        }).then((response) => {
            setMessage('Successfully created the group')
            setName('')
            fetchGroups()
        }, (error) => {
            setMessage(error?.response?.data?.message || 'Something went wrong')
        })
    }

    return (
        <div>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="Enter group name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </InputContainer>
            <InputContainer>
                {message}
            </InputContainer>
            <InputContainer>
                <Input disabled={!name}
                    type="button"
                    value="Submit"
                    onClick={onSubmit}
                />
            </InputContainer>
        </div>
    )

}

export default CreateGroup
