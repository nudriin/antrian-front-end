import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table"
import { UserResponse } from "../../types/payload"
import { useCallback, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import AdminLayout from "../../components/AdminLayout"
import AdminAddUserBtn from "../../components/AdminAddUserBtn"
import AdminDeleteUserBtn from "../../components/AdminDeleteUserBtn"
import { Button } from "../../components/ui/button"
import { TbTrashXFilled } from "react-icons/tb"

const columnHelper = createColumnHelper<UserResponse>()
export default function AdminUsers() {
    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-end mb-2">
                    <AdminAddUserBtn />
                </div>
                <UsersTable />
            </div>
        </AdminLayout>
    )
}

function UsersTable() {
    const [users, setUsers] = useState<UserResponse[]>([])
    const [cookie] = useCookies(["auth"])
    const token = cookie.auth

    const getAllUsers = useCallback(async () => {
        try {
            const response = await fetch("/api/users", {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            const body = await response.json()

            if (!body.errors) {
                setUsers(body.data)
            } else {
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }, [token])

    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])

    const columns = [
        columnHelper.accessor("id", {
            cell: (info) => <span className="">{info.getValue()}</span>,
            header: () => <span>ID</span>,
        }),
        columnHelper.accessor("name", {
            cell: (info) => <span className="">{info.getValue()}</span>,
            header: () => <span>Nama</span>,
        }),
        columnHelper.accessor("email", {
            cell: (info) => <span className="">{info.getValue()}</span>,
            header: () => <span>Email</span>,
        }),
        columnHelper.accessor("role", {
            cell: (info) => <span className="">{info.getValue()}</span>,
            header: () => <span>Role</span>,
        }),
        columnHelper.accessor("id", {
            cell: (info) => {
                const role = info.row.original.role
                return role !== "SUPER_ADMIN" ? (
                    <AdminDeleteUserBtn id={info.getValue()} />
                ) : (
                    <Button disabled>
                        <TbTrashXFilled />
                    </Button>
                )
            },
            header: () => <span>Aksi</span>,
        }),
    ]

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    return (
        <div className="p-4 bg-white border-2 border-primary rounded-2xl">
            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border-2 rounded-lg border-primary"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="border-2 rounded-lg border-primary"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="py-2 border-2 rounded-lg border-primary"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-4">
                <button
                    className="px-4 py-2 text-white rounded-md bg-primary"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </span>
                <button
                    className="px-4 py-2 text-white rounded-md bg-primary"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
