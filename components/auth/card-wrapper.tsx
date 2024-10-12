import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButtom from "./back-button";
import Header from "./Header";
import Social from "./social";


interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string;
    backbuttonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}
const CardWrapper = ({children,
    headerLabel,
    backButtonHref,
    backbuttonLabel,
    showSocial
}:CardWrapperProps) => {
  return (
    <Card className="w-[400px]  border-none shadow-md bg-white text-black">
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
           {children} 
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )}
        <CardFooter>
            <BackButtom
            
            label={backbuttonLabel}
            href={backButtonHref}
            />
        </CardFooter>
    </Card>
  )
}

export default CardWrapper
