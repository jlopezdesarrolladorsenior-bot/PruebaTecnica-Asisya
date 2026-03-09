import { z } from 'zod';

export const productSchema = z.object({
productName: z
.string()
.min(1, "El nombre de la referencia es obligatorio")
.min(3, "El nombre debe tener al menos 3 caracteres")
.max(100, "El nombre no puede exceder los 100 caracteres"),

categoryName: z
.string()
.min(1, "Debe seleccionar una categoría para clasificar el producto")
});