import { z } from "zod";

export const createClientVehicleSchema = z.object({
  marca: z.string().nonempty("A marca é obrigatória."),
  modelo: z.string().nonempty("O modelo é obrigatório."),
  versao: z.string().nonempty("A versão é obrigatória."),
  km: z.number().min(0, "A quilometragem deve ser um número positivo."),
  ano: z
    .number()
    .min(1886, "O ano deve ser maior que 1886.")
    .max(new Date().getFullYear(), "O ano não pode ser no futuro."),
  valor: z.number().min(0, "O valor deve ser positivo."),
  nome: z.string().nonempty("O nome é obrigatório."),
  email: z.string().email("Informe um e-mail válido."),
  numero: z
    .string()
    .max(15, "O número deve ter no máximo 15 caracteres.")
    .nonempty("O número é obrigatório."),
});
