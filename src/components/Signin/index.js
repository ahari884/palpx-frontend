import React, { useState } from 'react'
import axiosConfig from '../../axiosGlobalConfig'
import { ErrorMessage, Input, InputContainer } from '../../style'
import { SigninWrapper } from './style'

const Signin = ({ updateLogin }) => {
   
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const onSubmit = () => {
        if (!username) {
            setErrorMessage('username is required')
            return
        }

        if (!password) {
            setErrorMessage('password is required')
            return
        }
        axiosConfig.post('/auth/signin', {
            username, 
            password
        }).then(response => {
            let data = response.data
            if(data.accessToken) {
                localStorage.setItem('access_token', data.accessToken)
                localStorage.setItem('isLoggedIn', "true")
                localStorage.setItem('userData', JSON.stringify(data.userData))
                updateLogin(true)
            }
        }, error => {
            console.log('Error', error)
            alert(error.response?.data?.message ?? 'something went wrong')
        })
    }

    return (
        <SigninWrapper>
            <h2>Sign in</h2>
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
                    value="Signin"
                    onClick={onSubmit}
                />
            </InputContainer>
        </SigninWrapper>
    ) 
}

export default Signin