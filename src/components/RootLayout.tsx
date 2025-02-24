import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <div className='max-w-full mx-auto px-4 lg:px-0 '>
        {/* header here  */}
        <Outlet/>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#ffffff",
            },
          }}
        />
    </div>
  )
}

export default RootLayout