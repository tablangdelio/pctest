import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
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
  useDisclosure
} from '@chakra-ui/react'
const AddRoleModal = ({ isOpen, setOpenAddRoleModal, token, setRoles, roles }) => {
  const { onOpen, onClose } = useDisclosure()
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const toast = useToast()
  async function handleSubmit() {
    try {
      const response = await axios.post(
        `${url}/tablangdelio/public/index.php/api/role/create`,
        {
          description: description
        },
        {
          headers: {
            Authorization: `Bearer ${token?.token}`,
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      )
      if (response?.status === 201) {
        toast({
          title: 'New Record Successfully Added!',
          description: 'New Record Successfully Added!.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })

        setRoles(prev => prev.concat(response?.data?.data))
        setOpenAddRoleModal(false)
        setDescription('')
      }
    } catch (err) {
      setError(err?.response?.data?.messages)
      console.log(err)
    }
  }
  return (
    <Modal size="3xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex>
            <Text as="b"> Add new Role</Text>
            <Spacer />
            <Button
              onClick={() => {
                setOpenAddRoleModal(false)
                setError(null)
              }}
            >
              x
            </Button>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Stack spacing="12px">
            <FormControl>
              <FormLabel>Role Description </FormLabel>
              <Input
                type="text"
                name="description"
                onChange={e => {
                  setDescription(() => e.target.value)
                  setError(null)
                }}
                value={description}
                isInvalid={error === null ? false : true}
                placeholder="Role Description"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={12} onClick={handleSubmit}>
            Add New Record
          </Button>
          <Spacer />
          <Button
            colorScheme="red"
            onClick={() => {
              setOpenAddRoleModal(false)
              setError(null)
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddRoleModal
