import React from "react"
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table"
import { IoIosMegaphone } from "react-icons/io"
import { Queue } from "../types/queue"
import { Locket } from "../types/locket"

const columnHelper = createColumnHelper<Queue>()

const QueueTable = ({
    queues,
    locketCode,
    locket,
    handleCall,
    textToSpeech,
}: {
    queues: Queue[]
    locketCode: string
    locket: Locket | undefined
    handleCall: (e: React.MouseEvent<HTMLButtonElement>) => void
    textToSpeech: (text: string) => void
}) => {
    const columns = [
        columnHelper.accessor("queue_number", {
            cell: (info) => (
                <span className="text-xl font-semibold">
                    {locketCode}
                    {String(info.getValue()).padStart(2, "0")}
                </span>
            ),
            header: () => <span>Nomor Antrian</span>,
        }),
        columnHelper.accessor("id", {
            cell: (info) => (
                <div className="flex items-center justify-center p-2">
                    <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            const text = `Nomor antrian, ${locketCode},${String(
                                info.row.original.queue_number
                            ).padStart(2, "0")}, silahkan menuju loket, ${
                                locket?.name
                            }`
                            textToSpeech(text)
                            handleCall(e)
                        }}
                        value={info.getValue()}
                    >
                        <IoIosMegaphone
                            size={35}
                            className={`p-2 text-primary rounded-full cursor-pointer ${
                                info.row.original.updatedAt
                                    ? "bg-muted"
                                    : "bg-lime"
                            } hover:scale-105`}
                        />
                    </button>
                </div>
            ),
            header: () => <span>Panggil</span>,
        }),
    ]

    const table = useReactTable({
        data: queues,
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
                                    className="border-2 rounded-lg border-primary"
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

export default QueueTable
