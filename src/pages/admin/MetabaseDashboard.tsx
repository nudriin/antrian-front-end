import AdminLayout from "../../components/AdminLayout"

export default function MetabaseDashboard() {
    return (
        <AdminLayout>
            <div className="grid grid-cols-4 gap-2 p-4">
                <div>
                    <iframe
                        src="http://localhost:3000/public/question/bfba5326-d65f-4c6f-80bd-2674c5293b73"
                        width="100%"
                        height="200"
                        allowTransparency
                    ></iframe>
                </div>
                <div>
                    <iframe
                        src="http://localhost:3000/public/question/a443ef8a-fac9-4b56-85c9-bf8ce806c962"
                        width="100%"
                        height="200"
                        allowTransparency
                    ></iframe>
                </div>
                <div>
                    <iframe
                        src="http://localhost:3000/public/question/bb2ad0f9-ee18-42e6-ad9e-4120de42d79e"
                        width="100%"
                        height="200"
                        allowTransparency
                    ></iframe>
                </div>
                <div>
                    <iframe
                        src="http://localhost:3000/public/question/0655f781-12ef-4e7c-b378-b452d4e9f35b"
                        width="100%"
                        height="200"
                        allowTransparency
                    ></iframe>
                </div>
                <div className="col-span-2">
                    <iframe
                        src="http://localhost:3000/public/question/25155f1f-640d-46fb-b887-f1defefbe0bb"
                        width="100%"
                        height="400"
                        allowTransparency
                    ></iframe>
                </div>
                <div className="col-span-2">
                    <iframe
                        src="http://localhost:3000/public/question/18517ba0-d298-4107-a155-0ccb6451b58b"
                        width="100%"
                        height="400"
                        allowTransparency
                    ></iframe>
                </div>
                <div className="col-span-full">
                    <iframe
                        src="http://localhost:3000/public/question/224f69d2-424e-4b2f-abbf-31d01dd7439f"
                        width="100%"
                        height="350"
                        allowTransparency
                    ></iframe>
                </div>
            </div>
        </AdminLayout>
    )
}
