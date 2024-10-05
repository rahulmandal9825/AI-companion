
const RootLayout = ({
    children
}: {children: React.ReactNode;})=>{
    return (
            <main className=" w-full h-screen ">
                {children}
            </main>

    )
}

export default RootLayout;