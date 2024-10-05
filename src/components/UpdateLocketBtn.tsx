import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCookies } from "react-cookie"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { toast } from "../hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa"

const locketSchema = z.object({
    name: z.string().min(1).max(119),
})

type locketSchemaType = z.infer<typeof locketSchema>

export default function UpdateLocketBtn({
    id,
    name,
}: {
    id: number
    name: string
}) {
    const locket = useForm<locketSchemaType>({
        resolver: zodResolver(locketSchema),
        defaultValues: {
            name: "",
        },
    })
    const [cookie] = useCookies(["auth"])
    const token = cookie.auth
    const navigate = useNavigate()

    const handleLocketUpdate = async (values: locketSchemaType) => {
        try {
            const response = await fetch(`/api/locket/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            })

            const body = await response.json()
            if (!body.errors) {
                toast({
                    title: "Sukses",
                    description: "Loket berhasil diubah",
                })
                navigate(0)
            } else {
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: `${error}`,
                variant: "destructive",
            })
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-secondary text-primary" size={"icon"}>
                    <p className="font-semibold">
                        <FaRegEdit />
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl font-semibold">
                        Ubah loket {name.toUpperCase()}
                    </DialogTitle>
                    <DialogDescription>
                        Ubah dan sesuaikanlah loket mu
                    </DialogDescription>
                </DialogHeader>
                <Form {...locket}>
                    <form onSubmit={locket.handleSubmit(handleLocketUpdate)}>
                        <FormField
                            control={locket.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button
                        onClick={locket.handleSubmit(handleLocketUpdate)}
                        disabled={locket.formState.isSubmitting}
                        className="w-full bg-lime text-primary"
                    >
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
