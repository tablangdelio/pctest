import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text
} from '@chakra-ui/react'

const ConfirmModal = ({ isConfirmModal, setIsConfirmModal, handleRemoveItem }) => {
  const { onOpen, onClose } = useDisclosure()

  return (
    <Modal
      isOpen={isConfirmModal.isOpen}
      onOpen={onOpen}
      onClose={() => setIsConfirmModal({ isOpen: false, data: null })}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove record</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="tomato" align="center" fontWeight={700}>
            Are you sure you want to remove this record?{' '}
          </Text>
          <Text fontSize="lg" align="center" fontStyle="italic" fontWeight={700}>
            {isConfirmModal?.data?.firstname} {isConfirmModal?.data?.lastname}{' '}
            {isConfirmModal?.data?.description}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="facebook"
            mr={3}
            onClick={() => handleRemoveItem(isConfirmModal?.data?.access_level_id)}
          >
            CONFIRM
          </Button>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => setIsConfirmModal({ isOpen: false, data: null })}
          >
            CANCEL
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
