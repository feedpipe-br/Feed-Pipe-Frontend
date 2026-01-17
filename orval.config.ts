import { defineConfig } from "orval";
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
    main: {
        input: {
            target: process.env.API_OPENAPI_SCHEMA as string,
        },
        output: {
            target: 'src/api/endpoints',
            mode: 'tags-split',
            client: 'react-query',
            mock: false,
            prettier: true,
            override: {
                mutator: {
                    path: './axios/axios.ts',
                    name: 'axiosInstance',
                },
            },
        },
    },
});
