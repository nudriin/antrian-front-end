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
import { FaRegEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import CreateLocketBtn from "../../components/CreateLocketBtn"

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
    const [loading, setLoading] = useState<boolean>(false)

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
                setLoading(false)
            } else {
                setLoading(false)
                throw new Error(body.errors)
            }
        } catch (error) {
            setLoading(false)
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
    const handleDelete = async (id: number) => {}

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
                    <Link to={`/locket/${locket.name}`}>Lihat</Link>
                </Button>
                <Button className="bg-secondary text-primary" size={"icon"}>
                    <FaRegEdit />
                </Button>
                <Button
                    size={"icon"}
                    onClick={() => {
                        handleDelete(locket.id)
                    }}
                    className="bg-red-500"
                >
                    <TbTrashXFilled />
                </Button>
            </CardFooter>
        </Card>
    )
}
