process.env.NODE_ENV = 'test';

module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.ts',
            '.env.test.local',
            '!src/**/*spec.ts',
            {
                pattern: 'test/*.json',
                instrument: false,
            },
        ],

        tests: ['src/**/*spec.ts'],

        env: {
            type: 'node',
            runner: 'node',
        },
        setup: function (wallaby) {
            require('dotenv').config({ path: '.env.test.local' });
            console.log('Setup');
            console.log('Current worker id: ' + wallaby.workerId);
            console.log('Current session id: ' + wallaby.sessionId);
        },
        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                /* TypeScript compiler specific options
                 * https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
                 * (no need to duplicate tsconfig.json, if you have it, it will be automatically used) */
            }),
        },
        testFramework: 'mocha',
        filesWithNoCoverageCalculated: [],
        runMode: 'onsave',
        trace: true,
    };
};
