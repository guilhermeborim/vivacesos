import { useState } from "react"

export const useInitialStepWelcome = (isOpen: boolean) => {
  const [modalWelcome, setmodalWelcome] = useState(isOpen)

  return {
    actions: {
      setmodalWelcome,
    },
    data: {
      modalWelcome,
    },
  }
}
