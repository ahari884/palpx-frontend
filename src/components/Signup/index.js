import React, { useState } from 'react'
import { ErrorMessage, Input, InputContainer } from '../../style'
import { SignupWrapper } from './style'
import axiosConfig from '../../axiosGlobalConfig'

const Signup = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const OnSubmit = () => {
        if (!firstName) {
            setErrorMessage('first name is required')
            return
        }

        if (!lastName) {
            setErrorMessage('last name is required')
            return
        }

        if (!username) {
            setErrorMessage('username is required')
            return
        }

        if (!password) {
            setErrorMessage('password is required')
            return
        }
        axiosConfig.post('/auth/signup', {
            firstName,
            lastName,
            username, 
            password
        }).then(response => {
            if(response.data.success) {
                setErrorMessage(null)
                alert(response.data.message)
            }
        }, error => {
            console.log('Error', error.response)
            alert(error.response?.data?.message ?? 'something went wrong')
        })
    }

    return (
        <SignupWrapper>
            <h2>Sign up</h2>
            <InputContainer>
                <Input
                    type="text"
                    onChange={(e) => { setFirstName(e.target.value) }}
                    value={firstName}
                    placeholder='Enter first name'
                    required={true}
                />
            </InputContainer>
            <InputContainer>
                <Input
                    type="text"
                    onChange={(e) => { setLastName(e.target.value) }}
                    value={lastName}
                    placeholder='Enter last name'
                    required={true}
                />
            </InputContainer>
            <InputContainer>
                <Input
                    type="text"
                    onChange={(e) => { setUsername(e.target.value) }}
                    value={username}
                    placeholder='Enter username'
                    required={true}
                />
            </InputContainer>
            <InputContainer>
                <Input
                    type="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={password}
                    placeholder='Enter password'
                    required={true}
                />
            </InputContainer>
            <ErrorMessage>
                {errorMessage || null}
            </ErrorMessage>
            <InputContainer>
                <Input
                    type="submit"
                    value="Signup"
                    onClick={OnSubmit}
                />
            </InputContainer>
        </SignupWrapper>
    )
}

export default Signup