export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (!/^[0-9]{11}$/.test(digits)) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;
  const calc = (base: number) => {
    let sum = 0;
    for (let i = 0; i < base; i++) sum += parseInt(digits[i], 10) * (base + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  const d1 = calc(9);
  const d2 = calc(10);
  return d1 === parseInt(digits[9], 10) && d2 === parseInt(digits[10], 10);
}
