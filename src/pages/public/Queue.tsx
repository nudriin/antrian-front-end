import tutWuriImg from "../../assets/images/web/tut_wuri.png"

export default function Queue() {
  return (
    <section className="min-h-full">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center gap-3 col-span-4 bg-purples rounded-xl text-white text-left p-6 shadow-box border-2 border-darks2">
          <div>
            <p>tanggal</p>
            <h1 className="text-4xl font-bold my-6">
              Selamat Datang di Dinas Pendidikan Kota Palangka Raya
            </h1>
            <p className="text-2xl">Semoga harimu menyenangkan!</p>
          </div>
          <img className="h-48" src={tutWuriImg} alt="" />
        </div>
        <div className="col-span-1 bg-white rounded-xl text-purples shadow-box border-2 border-darks2">
          <h3 className="text-2xl m-3 uppercase font-semibold">Antrian</h3>
          <h1 className="text-6xl m-6 font-bold">A01</h1>
          <h3 className="text-2xl m-3 uppercase font-semibold">Loket PAUD</h3>
        </div>
        <div className="col-span-1 bg-white rounded-xl text-greens shadow-box border-2 border-darks2">
          <h3 className="text-2xl m-3 uppercase font-semibold">Antrian</h3>
          <h1 className="text-6xl m-6 font-bold">B01</h1>
          <h3 className="text-2xl m-3 uppercase font-semibold">Loket TK</h3>
        </div>
        <div className="col-span-1 bg-white rounded-xl text-oranges shadow-box border-2 border-darks2">
          <h3 className="text-2xl m-3 uppercase font-semibold">Antrian</h3>
          <h1 className="text-6xl m-6 font-bold">C01</h1>
          <h3 className="text-2xl m-3 uppercase font-semibold">Loket SD</h3>
        </div>
        <div className="col-span-1 bg-white rounded-xl text-teals shadow-box border-2 border-darks2">
          <h3 className="text-2xl m-3 uppercase font-semibold">Antrian</h3>
          <h1 className="text-6xl m-6 font-bold">D01</h1>
          <h3 className="text-2xl m-3 uppercase font-semibold">Loket SMP</h3>
        </div>
        <div className="col-span-2 bg-white rounded-xl text-oranges shadow-box border-2 border-darks2">
          <h3 className="text-2xl m-3 uppercase font-semibold">Antrian</h3>
          <h1 className="text-6xl m-6 font-bold">E01</h1>
          <h3 className="text-2xl m-3 uppercase font-semibold">Loket SMA</h3>
        </div>
        <div className="col-span-2 bg-white rounded-xl text-purples shadow-box border-2 border-darks2">
          <h3 className="text-2xl m-3 uppercase font-semibold">Antrian</h3>
          <h1 className="text-6xl m-6 font-bold">F01</h1>
          <h3 className="text-2xl m-3 uppercase font-semibold">
            Loket Perguruan Tinggi
          </h3>
        </div>
      </div>
    </section>
  )
}
