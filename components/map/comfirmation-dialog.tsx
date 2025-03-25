"use client"

import React from "react"
import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { Heading } from "@/components/ui/heading"
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button"



import { useRouter } from "expo-router"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Icon, MapPinIcon } from "@/components/ui/icon"

interface ConfirmationDialogProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
  locationName: string
}

export const ConfirmationDialog = ({ visible, onConfirm, onCancel, locationName }: ConfirmationDialogProps) => {
  return (
    <AlertDialog isOpen={visible} onClose={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">Địa điểm mới</Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>Địa điểm "{locationName}" chưa có trong hệ thống. Bạn có muốn đánh dấu điểm đến này không?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <HStack space="md">
            <Button variant="outline" onPress={onCancel}>
              <ButtonText>Hủy</ButtonText>
            </Button>
            <Button onPress={onConfirm}>
              <HStack space="xs" className="items-center">
                <Icon as={MapPinIcon} className="text-white" />
                <ButtonText>Đánh dấu điểm đến</ButtonText>
              </HStack>
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}