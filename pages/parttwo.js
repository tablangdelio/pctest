import { Box, Text, Stack, Button, Container, Input, Code, Link } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Image from 'next/image'

const parttwo = () => {
  const [firstParameter, setFirstParameter] = React.useState('')
  const [secondParameter, setSecondParameter] = React.useState(1)
  const [output, setOutput] = React.useState('Result Here..')
  /*
     * Create a function that accepts two parameters. First parameter accepts an array of integers (at
        least 5 items) and the second parameter accepts number 1 or 2.
     */
  function handleShowOutput() {
    const secondParameterInput = [1, 2]
    const firstparameterInput = firstParameter.split(',')
    console.log(firstparameterInput)
    if (Array.isArray(firstparameterInput)) {
      if (firstparameterInput.length < 5) {
        return setOutput('First parameter must 5 integer ex. 1,3,4,2,5 ')
      }
      if (!secondParameterInput.includes(+secondParameter)) {
        return setOutput('Second parameter must 1 or 2 only ')
      }

      if (+secondParameter === 2) {
        return setOutput(
          firstparameterInput.sort(function (a, b) {
            return b - a
          })
        )
      }
      if (+secondParameter === 1) {
        return setOutput(
          firstparameterInput.sort(function (a, b) {
            return a - b
          })
        )
      }
    }
  }

  return (
    <Container maxW="2xl" mt="4" mb="12">
      <Button size={'sm'}>
        <Link href="/">
          <Text as="b"> Go back</Text>
        </Link>
      </Button>
      <Stack spacing={5} mt={4} mb="12" boxShadow="xl" p="6" rounded="xl" bg="white">
        <Text as="b"> Part 2 </Text>
        <Text>
          Create a function that accepts two parameters. First parameter accepts an array of
          integers (at least 5 items) and the second parameter accepts number 1 or 2. Inside the
          function create a condition that will return a sorted array that depends on second
          parameter. If the second parameter is 2, sort the array highest to lowest and vice versa
          if 1.
        </Text>
        <Stack>
          <Text as="b"> First Parameter</Text>
          <Input
            variant="outline"
            placeholder="Add Integer with ' , ' to seperate ex 2,3,4,5,6"
            onChange={e => setFirstParameter(() => e.target.value)}
          />
          <Text as="b"> Second Parameter</Text>
          <Input
            variant="outline"
            placeholder=" 1 or 2"
            onChange={e => setSecondParameter(() => e.target.value)}
            value={secondParameter}
          />
          <Button onClick={handleShowOutput} colorScheme="teal">
            Show Output
          </Button>
        </Stack>
        <Text textAlign="center" fontWeight={700} mt={4} mb="4">
          {JSON.stringify(output)}{' '}
        </Text>
        <Text as="i"> Base Code </Text>
        <Image src="/part2.png" width={400} height={400} alt="image" />
      </Stack>
    </Container>
  )
}

export default parttwo
