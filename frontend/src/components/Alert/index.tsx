import { Alert as RadixAlert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

interface Props {
  message: string
}

export const Alert: React.FC<Props> = ({message}) => {
  return (<RadixAlert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      {message}
    </AlertDescription>
  </RadixAlert>
  )
}