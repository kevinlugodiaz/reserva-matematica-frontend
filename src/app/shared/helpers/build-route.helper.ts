import { IntranetRoutes } from '@intranet/shared/enums/intranet-routes.enum';

/**
 * Construye la URL para la ruta de reservación de matemáticas en el intranet.
 * @param paths Segmentos adicionales de la ruta.
 * @returns La URL completa como string.
 */
export const buildMathReservationRouteUrl = (paths: string[]): string => {
  return ['/intranet', IntranetRoutes.mathReservation, ...paths].join('/');
};
