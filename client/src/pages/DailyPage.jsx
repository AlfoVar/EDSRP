const DailyPage = () => {
  return (
    <div>
      <form>
        <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-base font-semibold leading-8 text-white-900">
            Cierre Diario
          </h1>
          <p className="mt-1 text-sm leading-6 text-white-600">
           Surtidores Costo galon gasolina $14650
          </p>

          <p className="mt-2 text-sm leading-6 text-white-600">
            Surtidor 1 = $xxxxxxx
          </p>
          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <label
                className="block text-sm font-medium leading-6 text-white-900"
              >
               Registro Anterior
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Registro Cierre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Venta Galones
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Arqueo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};

export default DailyPage;
