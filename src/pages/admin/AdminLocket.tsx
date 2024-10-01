import { useCallback, useEffect, useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Button } from "../../components/ui/button"
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Locket } from "../../types/locket"
import { TbTrashXFilled } from "react-icons/tb"
import { FaIcons, FaRegEdit } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import CreateLocketBtn from "../../components/CreateLocketBtn"
import { useCookies } from "react-cookie"
import { toast } from "../../hooks/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import { BsEyeFill } from "react-icons/bs"

export default function AdminLocket() {
    return (
        <AdminLayout>
            <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <CreateLocketBtn />
                    <LocketsCards />
                </div>
            </div>
        </AdminLayout>
    )
}

function LocketsCards() {
    const [lockets, setLockets] = useState<Locket[]>()

    const getAllLocket = useCallback(async () => {
        try {
            const response = await fetch("/api/locket", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const body = await response.json()

            if (!body.errors) {
                setLockets(() => body.data)
            } else {
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getAllLocket()
    }, [getAllLocket])

    return (
        <>
            {lockets?.map((value, index) => (
                <LocketsCard key={index} locket={value} />
            ))}
        </>
    )
}

function LocketsCard({ locket }: { locket: Locket }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [cookie] = useCookies(["auth"])
    const token = cookie.auth
    const navigate = useNavigate()
    const handleDelete = async (id: number) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/locket/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            const body = await response.json()

            if (!body.errors) {
                setLoading(false)
                toast({
                    title: "Sukses",
                    description: "Loket berhasil dihapus",
                })
                navigate(0)
            } else {
                setLoading(false)
                throw new Error(body.errors)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast({
                title: "Error",
                description: `${error}`,
                variant: "destructive",
            })
        }
    }

    return (
        <Card className="h-full gap-4 rounded-2xl group border-primary/20 hover:cursor-pointer">
            <CardHeader>
                <CardTitle className="flex items-center justify-center">
                    <span className="font-semibold">
                        Loket {locket.name.toUpperCase()}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center justify-center gap-2">
                <Button asChild>
                    <Link to={`/locket/${locket.name}`}>
                        <BsEyeFill className="text-secondary" />
                    </Link>
                </Button>
                <Button className="bg-secondary text-primary" size={"icon"}>
                    <FaRegEdit />
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="bg-red-500">
                            <TbTrashXFilled />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Kamu yakin ingin menghapus loket ini?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <span className="text-red-500">
                                    Dengan menghapus loket ini, kamu tidak akan
                                    bisa mengembalikannya lagi
                                </span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                disabled={loading}
                                className="bg-red-500"
                                onClick={() => {
                                    handleDelete(locket.id)
                                }}
                            >
                                Hapus{" "}
                                {loading && (
                                    <FaIcons className="animate-spin" />
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}
