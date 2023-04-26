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
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { url } from '@/config'

const AddEmployeeModal = ({ isOpen, onClose, roles, token, setEmployees }) => {
  const toast = useToast()
  const [form, setForm] = useState({})
  const [error, setError] = useState({})
  const onChangeInput = ({ name, value }) => {
    setForm({ ...form, ...{ [name]: value } })
    setError({})
  }

  async function handleAddItem() {
    try {
      const response = await axios.post(
        `${url}/tablangdelio/public/index.php/api/employee/create`,
        {
          firstname: form?.firstname,
          lastname: form?.lastname,
          age: form?.age,
          email: form?.email,
          password: form?.password,
          birth_date: form?.birth_date,
          job_title: form?.job_title,
          access_level_id: form?.access_level_id
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
          title: 'New Record Successfully Added!',
          description: 'New Record Successfully Added!.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        setEmployees(prev => prev.concat(response?.data?.data))
        onClose()
        setForm({})
        setError({})
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setError(err?.response?.data?.messages)
      }
      console.log(err)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex>
            <Text as="b"> Add new record</Text>
            <Spacer />
            <Button
              onClick={() => {
                onClose()
                setError({})
              }}
            >
              x
            </Button>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Stack spacing="12px">
            <HStack>
              <FormControl>
                <FormLabel>Job Title </FormLabel>
                <Input
                  type="text"
                  onChange={e => onChangeInput({ name: 'job_title', value: e.target.value })}
                  isInvalid={error?.hasOwnProperty('job_title') ? true : false}
                  placeholder="Job Title"
                />
              </FormControl>
            </HStack>
            <HStack marginBottom={4}>
              <FormControl>
                <FormLabel>Firstname</FormLabel>
                <Input
                  type="text"
                  onChange={e => onChangeInput({ name: 'firstname', value: e.target.value })}
                  placeholder="Firstname"
                  isInvalid={error?.hasOwnProperty('firstname') ? true : false}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Lastname</FormLabel>
                <Input
                  type="text"
                  onChange={e => onChangeInput({ name: 'lastname', value: e.target.value })}
                  placeholder="lastname"
                  isInvalid={error?.hasOwnProperty('lastname') ? true : false}
                />
              </FormControl>
              <FormControl>
                <FormLabel>age</FormLabel>
                <Input
                  type="number"
                  onChange={e => onChangeInput({ name: 'age', value: e.target.value })}
                  placeholder="age"
                  isInvalid={error?.hasOwnProperty('age') ? true : false}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Birthday </FormLabel>
              <Input
                type="date"
                onChange={e => onChangeInput({ name: 'birth_date', value: e.target.value })}
                isInvalid={error?.hasOwnProperty('birth_date') ? true : false}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Select Role</FormLabel>
              <Select
                placeholder="Select Role"
                onChange={e => onChangeInput({ name: 'access_level_id', value: e.target.value })}
                isInvalid={error?.hasOwnProperty('access_level_id') ? true : false}
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
                  onChange={e => onChangeInput({ name: 'email', value: e.target.value })}
                  placeholder="email"
                  isInvalid={error?.hasOwnProperty('email') ? true : false}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password </FormLabel>
                <Input
                  type="text"
                  onChange={e => onChangeInput({ name: 'password', value: e.target.value })}
                  placeholder="password"
                  isInvalid={error?.hasOwnProperty('password') ? true : false}
                />
              </FormControl>
            </HStack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={handleAddItem} mr={12}>
            Add New Record
          </Button>
          <Spacer />
          <Button
            colorScheme="red"
            onClick={() => {
              onClose()
              setError({})
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddEmployeeModal
