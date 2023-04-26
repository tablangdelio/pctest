import React, { useEffect, useState, useRef } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  VStack,
  Flex,
  Spacer,
  HStack,
  Stack,
  Text,
  useToast,
  Form,
  VisuallyHidden
} from '@chakra-ui/react'
import axios from 'axios'
import { url } from '@/config'

const UpdateEmployeeModal = ({
  openUpdateModal,
  setOpenUpdateModal,
  roles,
  token,
  setEmployees,
  employees
}) => {
  const toast = useToast()
  const [form, setForm] = useState({})
  const handleChange = ({ name, value }) => {
    setForm({ ...form, ...{ [name]: value } })
  }
  const [error, setError] = useState({})

  async function handleUpdateItem(e) {
    e.preventDefault()

    try {
      const response = await axios.put(
        `${url}/api/employee/${openUpdateModal?.data?.employee_id}/update`,
        {
          firstname: e.target.elements.firstname.value,
          lastname: e.target.elements.lastname.value,
          age: e.target.elements.age.value,
          email: e.target.elements.email.value,
          birth_date: e.target.elements.birth_date.value,
          job_title: e.target.elements.job_title.value,
          password: e.target.elements.password.value,
          access_level_id: e.target.elements.access_level_id.value
        },
        {
          headers: {
            Authorization: `Bearer ${token?.token}`,
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      )

      if (response.status === 201) {
        toast({
          title: 'Record Successfully Updated!',
          description: 'Record Successfully Updated!.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })

        const [updateData] = employees.filter(
          item => item?.employee_id === openUpdateModal?.data?.employee_id
        )

        updateData.firstname = e.target.elements.firstname.value
        updateData.lastname = e.target.elements.lastname.value
        updateData.age = e.target.elements.age.value
        updateData.email = e.target.elements.email.value
        updateData.birth_date = e.target.elements.birth_date.value
        updateData.job_title = e.target.elements.job_title.value
        updateData.access_level_id = e.target.elements.access_level_id.value

        employees.map(item => (item.employee_id === updateData.employee_id ? updateData : item))
        setEmployees(employees)
        setOpenUpdateModal({ isOpen: false, data: null })

        setForm({})
        setError({})
      }
      console.log(response)
    } catch (err) {
      if (err?.response?.status === 400) {
        setError(err?.response?.data?.messages)
      }
      console.log(err)
    }
  }

  return (
    <Modal isOpen={openUpdateModal?.isOpen} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex>
            <Text as="b"> Update Record</Text>
            <Spacer />
            <Button
              onClick={() => {
                setOpenUpdateModal({ isOpen: false, data: {} })
                setForm({})
              }}
            >
              X
            </Button>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleUpdateItem}>
            <Stack spacing="12px">
              <HStack>
                <FormControl>
                  <FormLabel>Job Title </FormLabel>
                  <Input
                    type="text"
                    onChange={e =>
                      handleChange({
                        name: 'job_title',
                        value: e.target.value
                      })
                    }
                    isInvalid={error?.hasOwnProperty('job_title') ? true : false}
                    placeholder="Job Title"
                    name="job_title"
                    value={form?.job_title ?? openUpdateModal?.data?.job_title}
                  />
                </FormControl>
              </HStack>
              <HStack marginBottom={4}>
                <FormControl>
                  <FormLabel>Firstname</FormLabel>
                  <Input
                    type="text"
                    onChange={e => handleChange({ name: 'firstname', value: e.target.value })}
                    placeholder="Firstname"
                    isInvalid={error?.hasOwnProperty('firstname') ? true : false}
                    name="firstname"
                    value={form?.firstname ?? openUpdateModal?.data?.firstname}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Lastname</FormLabel>
                  <Input
                    type="text"
                    onChange={e => handleChange({ name: 'lastname', value: e.target.value })}
                    placeholder="lastname"
                    isInvalid={error?.hasOwnProperty('lastname') ? true : false}
                    name="lastname"
                    value={form?.lastname ?? openUpdateModal?.data?.lastname}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>age</FormLabel>
                  <Input
                    type="number"
                    onChange={e => handleChange({ name: 'age', value: e.target.value })}
                    placeholder="age"
                    isInvalid={error?.hasOwnProperty('age') ? true : false}
                    name="age"
                    value={form?.age ?? openUpdateModal?.data?.age}
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Birthday </FormLabel>
                <Input
                  type="text"
                  onChange={e => handleChange({ name: 'birth_date', value: e.target.value })}
                  isInvalid={error?.hasOwnProperty('birth_date') ? true : false}
                  name="birth_date"
                  value={form?.birth_date ?? openUpdateModal?.data?.birth_date}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Select Role</FormLabel>
                <Select
                  placeholder="Select Role"
                  onChange={e => handleChange({ name: 'access_level_id', value: e.target.value })}
                  isInvalid={error?.hasOwnProperty('access_level_id') ? true : false}
                  isDisabled={openUpdateModal?.data?.employee_id == 1 ? true : false}
                  name="access_level_id"
                  value={form?.access_level_id ?? openUpdateModal?.data?.access_level_id}
                >
                  {roles.map(item => {
                    return (
                      <option key={item.access_level_id} value={item.access_level_id}>
                        {item.description}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
              <HStack>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    onChange={e => handleChange({ name: 'email', value: e.target.value })}
                    placeholder="email"
                    isInvalid={error?.hasOwnProperty('email') ? true : false}
                    name="email"
                    value={form?.email ?? openUpdateModal?.data?.email}
                    isDisabled={openUpdateModal?.data?.employee_id == 1 ? true : false}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>New Password </FormLabel>
                  <Input
                    type="text"
                    onChange={e => handleChange({ name: 'password', value: e.target.value })}
                    placeholder="New password"
                    name="password"
                    isDisabled={openUpdateModal?.data?.employee_id == 1}
                  />
                </FormControl>
              </HStack>
            </Stack>
            <Button colorScheme="whatsapp" mr={12} type="submit" mt={4}>
              Update Record
            </Button>
          </form>
        </ModalBody>

        <ModalFooter>
          <Spacer />
          <Button
            colorScheme="red"
            onClick={() => {
              setOpenUpdateModal({ isOpen: false, data: {} })
              setError({})
              setForm({})
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateEmployeeModal
