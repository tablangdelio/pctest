import React, { useState } from 'react'
import Link from 'next/link'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Button,
  Flex,
  Spacer,
  Box,
  HStack,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { parse } from 'cookie'

import Cookies from 'js-cookie'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

import { HiPencilAlt } from 'react-icons/Hi'
import AddRoleModal from '@/components/AddRoleModal'
import ConfirmModal from '@/components/ConfirmModal'
import UpdateRoleModal from '@/components/UpdateRoleModal'
import { url } from '@/config'

const roles = ({ data, token }) => {
  const _token = JSON.parse(token)
  const [openAddRoleModal, setOpenAddRoleModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState({ isOpen: false, data: {} })

  const toast = useToast()

  const [roles, setRoles] = useState(data)

  function handleOpenAddModal() {
    setOpenAddRoleModal(true)
  }
  const [isConfirmModal, setIsConfirmModal] = useState({
    isOpen: false,
    data: null
  })

  async function handleRemoveItem(roleId) {
    try {
      const response = await axios.delete(`${url}/api/role/${roleId}/delete`, {
        headers: {
          Authorization: `Bearer ${_token?.token}`
        }
      })

      if (response.status === 200) {
        toast({
          title: 'Record Deleted!',
          description: 'Record Successfully Deleted!.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })

        setIsConfirmModal({ isOpen: false, data: null })
        setRoles(prev => prev.filter(item => item?.access_level_id !== roleId))
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 9000,
        isClosable: true
      })

      console.log(error)
    }
  }

  return (
    <Container maxW="8xl" marginTop={12} p={8}>
      <TableContainer boxShadow="xl" p="6" rounded="xl" bg="white" size="sm">
        <HStack>
          <Link href={'/'}>
            <Button size="sm" leftIcon={<ArrowBackIcon />} variant="outline">
              Back
            </Button>
          </Link>

          <Button
            colorScheme="facebook"
            size="sm"
            leftIcon={<AddIcon />}
            marginBottom={4}
            onClick={handleOpenAddModal}
          >
            ADD USER ROLE
          </Button>
        </HStack>
        <Table variant="simple">
          <TableCaption>Employee List payChat app Test</TableCaption>
          <Thead>
            <Tr>
              <Th fontWeight={700}>Role Level ID</Th>
              <Th fontWeight={700}>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roles.map(item => {
              return (
                <Tr key={item.access_level_id}>
                  <Td fontWeight={600}>{item.access_level_id}</Td>
                  <Td fontWeight={600}>{item.description}</Td>
                  <Td>
                    {+item.access_level_id !== 1 && (
                      <>
                        <Button
                          colorScheme="teal"
                          mr={4}
                          onClick={() => setOpenUpdateModal({ isOpen: true, data: item })}
                        >
                          <HiPencilAlt />
                        </Button>
                        {+_token?.role === 1 && (
                          <Button
                            colorScheme="red"
                            onClick={() => setIsConfirmModal({ isOpen: true, data: item })}
                          >
                            <DeleteIcon />
                          </Button>
                        )}
                      </>
                    )}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AddRoleModal
        isOpen={openAddRoleModal}
        setOpenAddRoleModal={setOpenAddRoleModal}
        token={_token}
        roles={roles}
        setRoles={setRoles}
      />
      <UpdateRoleModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        token={_token}
        roles={roles}
        setRoles={setRoles}
      />
      <ConfirmModal
        isConfirmModal={isConfirmModal}
        setIsConfirmModal={setIsConfirmModal}
        handleRemoveItem={handleRemoveItem}
      />
    </Container>
  )
}

export default roles

export async function getServerSideProps(context) {
  const data = await fetch(`${url}/api/roles`).then(response => response.json())

  // Parse the cookies from the incoming request
  const cookies = parse(context.req.headers.cookie || '')

  // Extract the value of a cookie named "myCookie"
  const token = cookies.token

  // If the cookie is not present, redirect to the login page
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {
      data: data,
      token: token
    } // will be passed to the page component as props
  }
}
