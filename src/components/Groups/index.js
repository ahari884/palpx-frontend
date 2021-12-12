import React, { useEffect, useState } from 'react'
import axiosConfig from '../../axiosGlobalConfig'
import { Button, GroupsContainer, SingleGroup, SingleGroupEl } from './style'
import Modal from 'react-bootstrap/Modal'
import GroupUsersList from '../GroupUsersList'
import AddUserToGroup from '../AddUserToGroup'
import CreateGroup from '../CreateGroup'

const Groups = () => {

    const [groups, setGroups] = useState([])
    const [groupsFetched, setGroupsFetched] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState(null)

    const fetchGroups = () => {
        axiosConfig.get('/groups').then((response) => {
            if (response?.data?.length) {
                setGroups(response.data)
                setGroupsFetched(true)
            }
        }, (error) => {
            console.log('E', error)
        })
    }

    useEffect(() => {
        if (!groupsFetched)
            fetchGroups()
    })

    const updateModalData = (data) => {
        setModalData(data)
        setShowModal(true)
    }

    const deleteGroup = (group) => {
        axiosConfig.delete(`/groups/${group._id}`)
            .then((respnse)=> {
                let updatedGroups = groups.filter((g) => g._id !== group._id)
                setGroups(updatedGroups)
            })
    }

    return (
        <GroupsContainer>
            <h2>Groups</h2>
            <Button onClick={() => updateModalData({ createGroup: true })}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAFMUlEQVRIicWXa2yTVRjHf6d9267rGFvZVjbogBUZTBSIwJhj2I1BvTAGzEWNoHhBDTcToh+MWbJEY/wkFxPvyNXED7ihMmRjwEQC0YCJkAwFxojcurELbB29v8cPXbsV1oU5jM+nvs/t9/6fnPecU/ifTNyvRna7PQ4YDXgaGhqc/zm4oKAgXafTbQKWAHrgphAi99ChQ+cGq9MOB+pwOMzACaCgX684YG1WVpapubn5YKxazXDAfr+/ArANEBJSyrcLCwsdsWqVwRpXlpfr2zztc5GM0yBbtuw7sr9/3KBluTcY+q3XQv4EgSNbgyollbUqWi3PAbVDAq9dZLe3u9t2CRgLIMG3vsS+pqub3dsbGjwA3iCjJqUKnpwiKLQJEgwRwZQ9LKg+w/hY/Qcc9brS+TkCUUMvtNf0UoovR5hEfWV5uR5ghEF0v5GnocimRqBBVeL1B9FpIcmAb0hgnVA/AOKjfAokGAUI8js9N1YAfFQclMlGyYnGdvxBCYCzw8NfV1xMz9CwuSjoiQWOMWrxOIQajbdomT1ZxyOTtLi9ki3VHgKqLAO2WlOVSl2c2JiZnBapHJNiZEyKEUB6bypvDQnsD0hD3hQdRTN0WJL7hmLUC3InK/xyJpAKoNMadoCvAjAP0OZw3Guxv+UBR23L0HTNzFbo7nahqiHlXS4/zjY3ANkZ/g4A8XxNJ1K8IiFwR4tW1ODrsaAxwasdQdWSrMHnV3sHDkFVxR9QyZ2i8OI8V3c4VzxTt7enxfuZtzuA/3YAz60AXU7Py+LZw02DgQfcMmVtybuovB+zyq2kiGXV7fZl+8e2Xbu0LSfp+uzPFxxJDIeLvl10U41P3WUxjH2nrs7Rc8+KuRW3GYixIkWjWFbd/tjSmg1SyibFYCw+flFJrLowCVdAT8XxObR2uJPi45PWeU2BpsIlP82/Z8UAcn9pCQSrEaLffq52kJyYY/9wxTKE/CSUCK1Xm7nV0Yoywo8xo4eRaWbitVbkzTRQNR6hoaDhu6dO3hMYoO2rsZtGmRLeRGcEbyenexJLV+9774iiVS4DIyNNEjoRDx5FY/kbhIzUS58ReW4W6sVpR3+uWvTY4GApxeJj7qfPHPntY/PtC5aT418FwC91pJz6Gtu0h86bG7sfCDi7Qvnmayh5P4LijSlAvToJ/Sl7Rm1V2fWwL+pYfGK/NExtde8BUaFRtAknf22m0TSXFk06a66sw9klmFo4Z1T8jEyQkmCrE+28PQhd33L4pmwnZTlLEQLO3vgzpC6xneDoK/HNB/6oCedFLS5domejlKIUINWazvTiRzlwbQIbfi/ism8UcxYXYzAaQEBcfhZK7nmE3h2lzpKQhiUhDZPeFOUXiTdW5m9dPCL8HNm5So65M4VkVf9ka/YErNkTYo5QWC4gA2Az25hozoqK2cw2HBMXAFB74SAI1WhQfMVAdRRYhG4Rg57Pd5qqtgKQn5nHC9OWR8XyrXnkW/P6wIBGZWI43n/UmUOBhl52SO+JFERWYJ9iyVWgfkhgJXWm9PUkVTXupa5X1e6yHQBUnd1LVWN1dL7k9F3g7wuMO4GdQwEXb3OsQvCFy+fC5XNFxVw+F05XS3/XpcB4z7G7wP/GOn1t25MMKauAWWFfXVNIeVPHxf6pUkq5vqGwIXKKDfte7djlSA8EqQFmxEgJCOT6+pV1n/Z3DuteDdBU3eQaV2rdoUXXJQVWASm9odvADxqprqh/6eC+O+vu21+YsC3cudAkhEjMa8prqaysVO93/2HbP/2w2VB3YKKkAAAAAElFTkSuQmCC" /> Add Group
            </Button>
            {
                groups.map((group) => {
                    return (
                        <SingleGroup>
                            <SingleGroupEl onClick={() => updateModalData({ title: group.name, group, showGroupUsers: true })}>
                                {group.name}
                            </SingleGroupEl>
                            <div></div>
                            <SingleGroupEl onClick={() => updateModalData({ title: 'Add User - ' + group.name, group, showAddUser: true })}>
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/add-user-male.png" />
                            </SingleGroupEl>
                            <SingleGroupEl onClick={() => deleteGroup(group)}>
                                <img src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png" />
                            </SingleGroupEl>
                        </SingleGroup>
                    )
                })
            }
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {modalData?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        modalData?.showGroupUsers ?
                            <GroupUsersList group={modalData?.group}></GroupUsersList>
                            : null
                    }
                    {
                        modalData?.showAddUser ?
                            <AddUserToGroup group={modalData?.group} /> : null
                    }
                    {
                        modalData?.createGroup ?
                            <CreateGroup fetchGroups={fetchGroups}/> : null
                    }

                </Modal.Body>

            </Modal>
        </GroupsContainer>
    )
}

export default Groups
