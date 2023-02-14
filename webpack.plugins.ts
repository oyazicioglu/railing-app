// eslint-disable-next-line import/default
import CopyPlugin from 'copy-webpack-plugin';
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { join } from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
    new ForkTsCheckerWebpackPlugin({
        logger: 'webpack-infrastructure',
    }),
    new CopyPlugin({
        patterns: [
            {
                from: join(__dirname, 'prisma/schema.prisma'),
                to: join(__dirname, '.webpack', 'main'),
            },
            {
                from: join(__dirname, 'prisma/railing.db'),
                to: join(__dirname, '.webpack', 'main'),
            },
            {
                from: join(__dirname, 'node_modules', 'prisma', 'query_engine-windows.dll.node'),
                to: join(__dirname, '.webpack', 'main'),
            },
        ],
    }),
];
