
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog"
import { Button, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Icon, MapPinIcon } from "@/components/ui/icon"

import { Text } from "@/components/ui/text"

interface ConfirmationDialogProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
  locationName: string
}

export const ConfirmationDialog = ({ visible, onConfirm, onCancel, locationName }: ConfirmationDialogProps) => {
  return (
    <AlertDialog isOpen={visible} onClose={onCancel}>
      <AlertDialogContent className="gap-4">
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
              <HStack space="xs">
                <Icon as={MapPinIcon} size="2xl" className="text-white" />
                <ButtonText>Đánh dấu điểm đến</ButtonText>
              </HStack>
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

