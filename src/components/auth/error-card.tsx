import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { BackButton } from "./back-button"
import { CardWrapper } from "./card-wrapper"
import { Header } from "./header"


export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/erro"
      backButtonLabel="Back to login"
      headerLabel="Oops! Something went wrong!"
    >
      <div className="w-full justify-center flex items-center">
        <ExclamationTriangleIcon className="text-destructive"/>
      </div>
    </CardWrapper>
  )
}