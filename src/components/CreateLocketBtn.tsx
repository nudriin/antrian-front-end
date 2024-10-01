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
import { BsFileEarmarkPlus } from "react-icons/bs"
import { Input } from "./ui/input"
import { toast } from "../hooks/use-toast"

const locketSchema = z.object({
    name: z.string().min(1).max(119),
})

type locketSchemaType = z.infer<typeof locketSchema>

export default function CreateLocketBtn() {
    const locket = useForm<locketSchemaType>({
        resolver: zodResolver(locketSchema),
        defaultValues: {
            name: "",
        },
    })
    const [cookie] = useCookies(["auth"])
    const token = cookie.auth

    const handleLocketSubmit = async (values: locketSchemaType) => {
        try {
            const response = await fetch("/api/locket", {
                method: "POST",
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
                    description: "Loket berhasil dibuat",
                })
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
                <Button className="bg-lime group h-full min-h-[140px] items-center rounded-2xl justify-center flex flex-col hover:border-primary hover:cursor-pointer gap-4 text-primary">
                    <BsFileEarmarkPlus className="w-8 h-8 group-hover:text-muted-foreground" />
                    <p className="font-semibold">Buat loket baru</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl font-semibold">
                        Buat loket
                    </DialogTitle>
                    <DialogDescription>
                        Buat loket baru dan mulailah antrian
                    </DialogDescription>
                </DialogHeader>
                <Form {...locket}>
                    <form onSubmit={locket.handleSubmit(handleLocketSubmit)}>
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
                        onClick={locket.handleSubmit(handleLocketSubmit)}
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
