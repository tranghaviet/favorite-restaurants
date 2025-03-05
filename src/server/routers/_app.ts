/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { restaurantRouter } from './restaurant';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  restaurant: restaurantRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
