import LocketLayout from "../../components/LocketLayout"
import { TbAwardFilled } from "react-icons/tb"

export default function Welcome() {
    return (
        <LocketLayout>
            <div className="grid grid-cols-4 gap-4 p-6">
                <div className="col-span-4 p-4 bg-primary text-lime rounded-xl">
                    <div className="flex items-center gap-4">
                        <TbAwardFilled size={80} className="" />
                        <div className="text-left">
                            <h1 className="text-4xl font-semibold">
                                Selamat datang di admin loket
                            </h1>
                            <p className="text-darks2">
                                Silahkan pilih loket anda pada menu di bagian
                                samping kiri
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 p-4 text-left bg-white border-2 border-primary rounded-xl">
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam consequuntur veritatis accusamus earum dolores
                        dolorem, aliquam quam explicabo quis enim cumque, ad in
                        quo ducimus nesciunt cum consectetur, eaque ut.
                    </p>
                    <p className="mb-4">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Eaque, amet officia aliquam ratione omnis hic odit
                        in veniam eligendi labore esse tempora delectus,
                        recusandae qui expedita sapiente sint dolore
                        consequuntur?
                    </p>
                    <p className="mb-4">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Eaque, amet officia aliquam ratione omnis hic odit
                        in veniam eligendi labore esse tempora delectus,
                        recusandae qui expedita sapiente sint dolore
                        consequuntur?
                    </p>
                    <p className="mb-4">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Eaque, amet officia aliquam ratione omnis hic odit
                        in veniam eligendi labore esse tempora delectus,
                        recusandae qui expedita sapiente sint dolore
                        consequuntur?
                    </p>
                </div>
            </div>
        </LocketLayout>
    )
}
