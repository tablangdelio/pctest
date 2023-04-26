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

const UpdateRoleModal = ({ openUpdateModal, setOpenUpdateModal, token, roles, setRoles }) => {
  const toast = useToast()
  const [description, setDescription] = useState(null)
  const [error, setError] = useState(null)

  //   useEffect(() => {
  //     setDescription(openUpdateModal?.data?.description)
  //   }, [openUpdateModal?.data])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.put(
        `${url}/api/role/${openUpdateModal?.data?.access_level_id}/update`,
        {
          description: e.target.elements.description.value
        },
        {
          headers: {
            Authorization: `Bearer ${token?.token}`,
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      )
      toast({
        title: 'Record Successfully Updated!',
        description: 'New Record Successfully Updated!.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      const [updateData] = roles.filter(
        item => item?.access_level_id === openUpdateModal?.data?.access_level_id
      )
      updateData.description = e.target.elements.description.value
      roles.map(item => (item.access_level_id === updateData.access_level_id ? updateData : item))
      setRoles(roles)
      setOpenUpdateModal({ isOpen: false, data: {} })
    } catch (err) {
      setError(err)
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
                setDescription(null)
              }}
            >
              X
            </Button>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing="12px">
              <FormControl>
                <FormLabel>Role Description </FormLabel>
                <Input
                  type="text"
                  onChange={e => {
                    setDescription(() => e.target.value)
                    setError(null)
                  }}
                  name="description"
                  value={description === null ? openUpdateModal?.data?.description : description}
                  isInvalid={error === null ? false : true}
                  placeholder="Role Description"
                />
              </FormControl>
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
              setError(null)
              setDescription(null)
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateRoleModal
