import axios from "axios"

interface getCepProps {
  form: any
  cep: string
  setLoadingCep: (payload: boolean) => void
}

export async function getCep({ form, cep, setLoadingCep }: getCepProps) {
  if (!cep) return
  const cepFormatted = cep.replace(/\D/g, "")

  if (cepFormatted?.length !== 8) return
  try {
    setLoadingCep(true)
    const response = await axios.get(`https://viacep.com.br/ws/${cepFormatted}/json/`)
    const data = response.data

    form.setValue("road", data.logradouro || undefined)
    form.setValue("neighborhood", data.bairro || undefined)
    form.setValue("city", data.localidade || undefined)
  } catch (error) {
    setLoadingCep(false)
    console.log("erro", error)
  } finally {
    setLoadingCep(false)
  }
}
