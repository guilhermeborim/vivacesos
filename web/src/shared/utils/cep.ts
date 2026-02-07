import axios from "axios";

interface getCepProps {
  form: any;
  cep: string;
}

export async function getCep({ form, cep }: getCepProps) {
  if (!cep) return;
  const cepFormatted = cep.replace(/\D/g, "");

  if (cepFormatted?.length !== 8) return;
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${cepFormatted}/json/`,
    );
    const data = response.data;

    form.setValue("road", data.logradouro || "");
    form.setValue("neighborhood", data.bairro || "");
    form.setValue("city", data.localidade || "");
  } catch (error) {
    console.log("erro", error);
  }
}
