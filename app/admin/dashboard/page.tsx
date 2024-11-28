import Link from "next/link";

export default async function Dashboard() {
  const data = await fetch(`${process.env.PUBLIC_API_URL}/api/summary`, {
    method: 'GET',
    cache: 'no-store',
  });

    const { 
      num_of_total_customers,
      num_of_active_customers,
      num_of_accomplished_services,
      num_reports_submitted,
      num_of_services_today
    }  = await data.json();


  return (
    <div className="bg-light-green-A h-[calc(100vh-98px)] flex flex-col items-center justify-center w-screen gap-y-24">

      <div className="flex flex-row w-full gap-x-24 px-24">
        
        <div className="basis-1/3 w-full bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-dark-green-B">Reports Submitted</h2>
          <div className="flex flex-row items-center justify-center my-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-40 text-dark-green-B mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>
            <p data-test="reports_submitted" className="text-9xl font-bold text-dark-green-B">{num_reports_submitted}</p>
          </div>
        </div>

        <div className="basis-1/3 w-full bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-dark-green-B">Active Customers</h2>
          <div className="flex flex-row items-center justify-center my-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-40 text-dark-green-B mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p data-test="active_customers" className="text-9xl font-bold text-dark-green-B">{num_of_active_customers}</p>
          </div>
        </div>

        <div className="basis-1/3 w-full bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-dark-green-B">Accomplished Services</h2>
          <div className="flex flex-row items-center justify-center my-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-40 text-dark-green-B">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

            <p data-test="accomplished_services" className="text-9xl font-bold text-dark-green-B">{num_of_accomplished_services}</p>
          </div>
        </div>

      </div>

      <div className="flex flex-row w-full gap-x-24 px-24">
        
        <div className="basis-1/2 w-full bg-white p-4 rounded-lg shadow-lg">

          <h2 className="text-4xl font-bold text-dark-green-B">Total Customers</h2>
          <div className="flex flex-row items-center justify-center my-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-36 text-dark-green-B mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
            </svg>
            <p data-test="total_customers" className="text-9xl font-bold text-dark-green-B">{num_of_total_customers}</p>
          </div>

          <div className="flex justify-end">
            <Link href="/admin/customer" type="button" className="text-white bg-dark-green-B shadow-lg 
            ring-1 ring-inset ring-light-green w-1/4
            focus:ring-2 font-medium rounded-lg text-sm px-5 py-2.5">VIEW ALL</Link>
          </div>

        </div>

        <div className="basis-1/2 w-full bg-white p-4 rounded-lg shadow-lg">

          <h2 className="text-4xl font-bold text-dark-green-B">Services Today</h2>
          <div className="flex flex-row items-center justify-center my-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-36 text-dark-green-B mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>

            <p data-test="services_today" className="text-9xl font-bold text-dark-green-B">{num_of_services_today}</p>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-white bg-dark-green-B shadow-lg 
            ring-1 ring-inset ring-light-green w-1/4
            focus:ring-2 font-medium rounded-lg text-sm px-5 py-2.5">VIEW DATES</button>
          </div>

        </div>

      </div>

      
      
    </div>
  );
}
