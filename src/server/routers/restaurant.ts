/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { z } from 'zod';
import { prisma } from '~/server/prisma';
import { publicProcedure, router } from '../trpc';

export const restaurantRouter = router({
  getRestaurants: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { search } = input;
      const items = await prisma.restaurant.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
      return {
        items: items,
      };
    }),

  addFavorite: publicProcedure
    .input(z.object({ id: z.string(), isFavorite: z.boolean() }))
    .mutation(async ({ input }) => {
      return await prisma.restaurant.update({
        where: { id: input.id },
        data: { isFavorite: input.isFavorite },
      });
    }),
});
