import { Container, Box, Text, Link, Stack, Button, Input } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const partone = () => {
  const [input, setInput] = React.useState(1)
  const [output, setOutput] = React.useState('3')

  function handleSubmit() {
    let a = 1
    let b = 1
    let i = 3 //the index
    while (b <= input) {
      const c = a + b
      a = b
      b = c
      i++
    }
    return setOutput(i)
  }

  return (
    <Container spacing={5} mt={4} mb="12">
      <Button size="sm">
        <Link href="/login"> Go back</Link>
      </Button>
      <Stack boxShadow="xl" p="6" rounded="xl" bg="white">
        <Text as="b"> Part 1</Text>
        <Text>
          The Fibonacci sequence is, by definition, the integer sequence in which every number after
          the first two is the sum of the two preceding numbers. To simplify: 1, 1, 2, 3, 5, 8, 13,
          21, 34, 55, 89, 144, ... Counting from 1 as 1st position in the Fibonacci sequence, write
          a function that allows user to input the Fibonacci sequence to return the desired
          position/index that is greater than 4,000,000.
        </Text>
        <Stack>
          <Text as="b"> sequence start to 1 </Text>
          <Input type="number" value={input} onChange={e => setInput(() => e.target.value)} />
          <Button onClick={handleSubmit} colorScheme="teal">
            Submit
          </Button>
          <Text as="b">
            {output} is the desired index that is greater than {input}
          </Text>
        </Stack>
        <Text as="i"> Base Code </Text>

        <Image src="/part1.png" width={400} height={400} alt="image" />
      </Stack>
    </Container>
  )
}

export default partone
