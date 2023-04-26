import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { parse } from 'cookie'
import Cookies from 'js-cookie'
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
  useDisclosure,
  useToast,
  HStack,
  Box,
  Text
} from '@chakra-ui/react'

import axios from 'axios'

import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { FiSettings } from 'react-icons/fi'
import { HiPencilAlt } from 'react-icons/Hi'

import AddEmployeeModal from '@/components/AddEmployeeModal'
import ConfirmModal from '@/components/ConfirmModal'
import UpdateEmployeeModal from '@/components/UpdateEmployeeModal'
import { url } from '@/config'

export default function Home({ employees, roles, token }) {
  const router = useRouter()
  const _token = JSON.parse(token)
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isConfirmModal, setIsConfirmModal] = useState({
    isOpen: false,
    data: null
  })

  const [updateData, setUpdateData] = useState({})
  const [openUpdateModal, setOpenUpdateModal] = useState({
    isOpen: false,
    data: {}
  })

  function handleOpenUpdateModal(item) {
    setOpenUpdateModal({ isOpen: true, data: item })
  }

  //effect when handleRemoveItem triggered
  const [employeeId, setEmployeeId] = useState(null)

  useEffect(() => {
    if (isConfirmModal.data !== null) {
      setEmployeeId(isConfirmModal?.data?.employee_id)
    }
  }, [isConfirmModal.data])

  const [_employees, setEmployees] = useState(employees)

  async function handleRemoveItem() {
    try {
      const response = await axios.delete(
        `${url}/tablangdelio/public/index.php/api/employee/${employeeId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${_token?.token}`
          }
        }
      )

      if (response.status === 200) {
        toast({
          title: 'Record Deleted!',
          description: 'Record Successfully Deleted!.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })

        setIsConfirmModal({ isOpen: false, data: null })
        setEmployees(prev => prev.filter(item => item?.employee_id !== employeeId))
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  function handleLogout() {
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <Container maxW="8xl" marginTop={12} p={8}>
      <Flex>
        <Spacer />
        <Button colorScheme="teal" size="sm" onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </Flex>
      <TableContainer boxShadow="xl" p="6" rounded="md" bg="white">
        <Flex spacing={4} align="center" mb={8}>
          <HStack>
            <Button colorScheme="facebook" size="sm" leftIcon={<AddIcon />} onClick={onOpen}>
              ADD Employee
            </Button>
            <Link href={'roles'}>
              <Button colorScheme="blue" size="sm" leftIcon={<FiSettings />} variant="outline">
                ROLES
              </Button>
            </Link>
          </HStack>
          <Spacer />
          <Box>
            <Text fontSize={'sm'} fontWeight={800}>
              Hi, {_token?.firstname}
            </Text>
            <Text fontSize={'sm'}>
              {roles.map(role => {
                if (role?.access_level_id == +_token?.role) {
                  return role?.description
                }
              })}
            </Text>
          </Box>
        </Flex>
        <Table variant="simple">
          <TableCaption>Employee List payChat app Test</TableCaption>
          <Thead>
            <Tr>
              <Th>Employee ID#</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Age</Th>
              <Th>Birthday</Th>
              <Th>Email</Th>
              <Th>Job Title</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {_employees?.map(item => {
              return (
                <Tr key={item?.employee_id}>
                  <Td>{item?.employee_id}</Td>
                  <Td>{item?.firstname}</Td>
                  <Td>{item?.lastname}</Td>
                  <Td>{item?.age}</Td>
                  <Td>{item?.birth_date}</Td>
                  <Td>{item?.email}</Td>
                  <Td>{item?.job_title}</Td>
                  <Td>
                    {roles.map(role => {
                      if (role?.access_level_id === item?.access_level_id) {
                        return role?.description
                      }
                    })}
                  </Td>
                  <Td>
                    {
                      <Button colorScheme="teal" mr={4} onClick={() => handleOpenUpdateModal(item)}>
                        <HiPencilAlt />
                      </Button>
                    }
                    {+_token?.role === 1 ? (
                      +item?.employee_id !== 1 && (
                        <Button
                          colorScheme="red"
                          onClick={() => setIsConfirmModal({ isOpen: true, data: item })}
                        >
                          <DeleteIcon />
                        </Button>
                      )
                    ) : (
                      <></>
                    )}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AddEmployeeModal
        isOpen={isOpen}
        onClose={onClose}
        roles={roles}
        token={_token}
        setEmployees={setEmployees}
      />
      <ConfirmModal
        isConfirmModal={isConfirmModal}
        setIsConfirmModal={setIsConfirmModal}
        handleRemoveItem={handleRemoveItem}
      />
      <UpdateEmployeeModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        roles={roles}
        token={_token}
        setEmployees={setEmployees}
        employees={_employees}
      />
    </Container>
  )
}

export async function getServerSideProps(context) {
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

  const employees = await axios
    .get(`${url}/tablangdelio/public/index.php/api/employees`)
    .then(response => response.data)

  const roles = await axios
    .get(`${url}/tablangdelio/public/index.php/api/roles`)
    .then(response => response.data)

  return {
    props: {
      employees: employees,
      roles: roles,
      token: token
    } // will be passed to the page component as props
  }
}
