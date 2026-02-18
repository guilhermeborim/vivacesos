export function maskCpf(cpf: string): string {
  if (cpf.length !== 11) return cpf;

  const lastTwo = cpf.slice(-2);

  return `***.***.***-${lastTwo}`;
}
