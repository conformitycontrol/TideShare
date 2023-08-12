

/* eslint-disable */

import { clerkClient } from "@clerk/nextjs";
import { TRPCClientError } from "@trpc/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const profileRouter = createTRPCRouter({

    getUserByUsername: publicProcedure
    .input(z.object({username: z.string()}))
    .query(async ({ ctx, input }) => {

        const [user] = await clerkClient.users.getUserList({
            username: [input.username],
        });

        return user;
            

        
    })
})