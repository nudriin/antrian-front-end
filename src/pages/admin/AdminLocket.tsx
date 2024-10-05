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
import { Link } from "react-router-dom"
import CreateLocketBtn from "../../components/CreateLocketBtn"

import { BsEyeFill } from "react-icons/bs"
import DeleteLocketBtn from "../../components/DeleteLocketBtn"
import UpdateLocketBtn from "../../components/UpdateLocketBtn"
import useTotalQueue from "../../hooks/useTotalQueue"
import { IoMdPerson } from "react-icons/io"

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
    const total = useTotalQueue(locket.name || "")
    return (
        <Card className="h-full gap-4 rounded-2xl group border-primary/20 hover:cursor-pointer">
            <CardHeader>
                <CardTitle className="text-left">
                    <div className="mb-2 font-semibold">
                        Loket {locket.name.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-3 mb-2 text-4xl font-bold text-primary">
                        +{total?.total} <IoMdPerson size={40} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Total Antrian
                    </div>
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center justify-center gap-2">
                <Button asChild>
                    <Link to={`/locket/${locket.name}`}>
                        <BsEyeFill className="text-secondary" />
                    </Link>
                </Button>
                <UpdateLocketBtn id={locket.id} name={locket.name} />
                <DeleteLocketBtn id={locket.id} />
            </CardFooter>
        </Card>
    )
}
