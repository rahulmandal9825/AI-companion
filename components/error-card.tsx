import BackButtom from "./auth/back-button"
import Header from "./auth/Header"
import { Card, CardFooter, CardHeader } from "./ui/card"


const Errorcard = () => {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label="oop! Somehting went worng"/>
        </CardHeader>
        <CardFooter>
            <BackButtom
            label="Back to login"
            href="/auth/login"
            />
        </CardFooter>
    </Card>
  )
}

export default Errorcard
