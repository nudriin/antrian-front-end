import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react"
import { useCookies } from "react-cookie"

export default function Logout() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [, , removeCookie] = useCookies(["auth"])

    const logout = () => {
        removeCookie("auth")
    }
    return (
        <>
            <span onClick={onOpen}>Logout</span>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Kamu yakin ingin keluar dari halaman ini?
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <span>
                            Dengan menekan tombol logout, kamu akan otomatis
                            keluar dari halaman ini. Kamu dapat masuk kembali
                            melalui halaman login
                        </span>
                    </ModalBody>

                    <ModalFooter>
                        <button
                            onClick={logout}
                            className="px-3 py-2 mr-2 font-semibold text-white bg-red-500 rounded-xl"
                        >
                            Logout
                        </button>
                        <button
                            className="px-3 py-2 font-semibold text-white bg-primary rounded-xl"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
