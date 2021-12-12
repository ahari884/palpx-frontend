import styled, { css } from 'styled-components'
import { isMobile } from 'react-device-detect';

export const AuthorizationComps = styled.div`
    ${!isMobile &&
        css`
            display: grid;
            grid-template-columns: 50%  50%;
            width: 90%;
        `
    }
    margin: auto;
`

export const Input = styled.input`
    font-size: 16px;
    border-radius: 5px;
    padding: 2px 7px;
    background-color: white;
    border: #5c8480 solid 1px;
    height: 30px;
`

export const InputContainer = styled.div`
    padding: 10px;
`

export const ErrorMessage = styled.div`
    padding: 10px;
    color: red;
`
