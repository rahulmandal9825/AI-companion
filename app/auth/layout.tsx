
const AuthLayout =({children}:{children: React.ReactNode}) =>{
    return(
        <div className=" h-full flex items-center justify-center
          bg-secondary
        ">
            {children}
        </div>
    )
}

export default AuthLayout;