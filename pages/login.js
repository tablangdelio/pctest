import Reac, { useState } from 'react'
import { useRouter } from 'next/router'
import { UnlockIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  AbsoluteCenter,
  Text,
  Button,
  Stack,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { parse } from 'cookie'

import { url } from '@/config'
import Link from 'next/link'

const login = () => {
  const [form, setForm] = useState({})
  const [error, setError] = useState(null)
  const toast = useToast()
  const router = useRouter()

  function onFormChange({ name, value }) {
    setForm({ ...form, ...{ [name]: value } })
  }

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await axios.post(`${url}/api/login`, {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value
      })
      if (response?.data?.status) {
        const serializedData = JSON.stringify({
          role: response?.data?.role,
          token: response?.data?.token,
          firstname: response?.data?.firstname,
          user_id: response?.data?.user_id
        })
        Cookies.set('token', serializedData, {
          expires: 1,
          path: '/',
          secure: true,
          sameSite: 'strict'
        })
        router.push('/')
      } else {
        setError(response?.data?.message)
      }
    } catch (error) {
      toast({
        title: 'error!',
        description: 'No connection to server',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }
  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter axis="both">
        <Stack p={4}>
          <Link href="/partone">
            <Text as="b" color={'blue'}>
              Go to Part 1 Test
            </Text>
          </Link>
          <Link href="/parttwo">
            <Text as="b" color={'blue'}>
              Go to Part 2 Test
            </Text>
          </Link>
        </Stack>
        <Box p="3">
          <Text fontWeight={700}> Part 3</Text>
          <Text>username: tablangdelio@gmail.com</Text>
          <Text>password: password1234 </Text>
        </Box>
        <Stack spacing={4} width={'2xl'} boxShadow="xl" p="6" rounded="xl" bg="white">
          <Text as="b">Login</Text>
          {error !== null && (
            <Text as="i" color="red" fontWeight={700} align="center">
              {error}
            </Text>
          )}
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>@username</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                onChange={e => onFormChange({ name: 'email', value: e.target.value })}
                name="email"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                onChange={e => onFormChange({ name: 'password', value: e.target.value })}
                name="password"
              />
            </FormControl>

            <Button colorScheme="facebook" leftIcon={<UnlockIcon />} type="submit" mt={5}>
              Login
            </Button>
          </form>
        </Stack>
      </AbsoluteCenter>
    </Box>
  )
}

export default login

export async function getServerSideProps(context) {
  const cookies = parse(context.req.headers.cookie || '')

  // Extract the value of a cookie named "myCookie"
  const token = cookies.token

  // If the cookie is not present, redirect to the login page
  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
