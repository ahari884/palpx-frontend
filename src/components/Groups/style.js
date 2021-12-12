import styled from 'styled-components'

export const GroupsContainer = styled.div`
    padding: 10px;
`

export const SingleGroup = styled.div`
    display: grid;
    grid-template-columns: 50% 10% 20% 20%;
    width: 100%;
    margin: 5px 0px;
    text-align: left;
    background-color: lightgrey;
    padding: 14px;
`

export const SingleGroupEl = styled.div`
    cursor: pointer;
    :hover {
       color: #205752ba 
    }
    padding-left: 5px;
`

export const Button = styled.button`
    border: black solid 1px;
    padding: 10px;
    backgound-color: black;
    color: white;
    font-weight: 700;
    font-size: 18px;
    background-color: #5c8480;
    border-radius: 30px;
`
