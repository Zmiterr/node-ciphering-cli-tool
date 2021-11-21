const { spawn } = require('child_process');

describe('Error scenarios. Input:', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('User passes the same cli argument twice', (cb) => {
        const argv = ['-c', 'C1-C1-A-R0', '-c', 'C0'];
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);

        child.stderr.on('data', (data) => {
            const error = data.toString().trim();
            expect(error).toBe('Args have duplicates: -c');
        });
        child.on('exit', (errorCode) => {
            expect(errorCode).toBe(1);
            cb();
        });
    });

    test('User doesn\'t pass -c or --config argument', (cb) => {
        const argv = [];
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);

        child.stderr.on('data', (data) => {
            const error = data.toString().trim();
            expect(error).toBe('Args is empty!');
            cb();
        });
        child.on('exit', (errorCode) => {
            expect(errorCode).toBe(1);
            cb();
        });
    });

    test('User passes -i argument with path that doesn\'t exist or with no read access', (cb) => {
        const argv = ['-c', 'C1-C0', '-i', 'fakeFile.txt'];
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);

        child.stderr.on('data', (data) => {
            const error = data.toString().trim();
            expect(error).toBe('File fakeFile.txt doesn\'t exist!');

        });

        child.on('exit', (errorCode) => {
            expect(errorCode).toBe(1);
            cb();
        });
    });

    test('User passes -o argument with path to directory that doesn\'t exist or with no read access', (cb) => {
        const argv = ['-c', 'C1-C0', '-o', 'fakeFile.txt']
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);

        child.stderr.on('data', (data) => {
            const error = data.toString().trim();
            expect(error).toBe('File fakeFile.txt doesn\'t exist!');
        });

        child.on('exit', (errorCode) => {
            expect(errorCode).toBe(1);
            cb();
        });
    });

    test('User passes incorrect symbols in argument for --config', (cb) => {
        const argv = ['-c', 'C8']
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);

        child.stderr.on('data', (data) => {
            const error = data.toString().trim();
            expect(error).toBe('Config parameter C8 is wrong!');
        });

        child.stdout.on('data', (data) => {
            const result = data.toString().trim();
            expect(result).toBe('Config parameter C8 is wrong!');
        });

        child.stdin.end('Config parameter C8 is wrong!');

        child.on('exit', (errorCode) => {
            expect(errorCode).toBe(1);
            cb();
        });
    });
});

describe('Success scenarios. Input:', () => {
    const testString = 'This is secret. Message about "_" symbol!'
    beforeEach(() => {

        jest.resetModules();
    });

    test('"C1-C1-R0-A". Result must be "Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!"', (cb) => {
        const argv = ['-c', 'C1-C1-R0-A'];
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);
        child.stdout.on('data', (data) => {
            const result = data.toString().trim();
            expect(result).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
        });

        child.stdin.end(testString);

        child.on('exit', (code) => {
            expect(code).toBe(0);
            cb();
        });
    });

    test('"C1-C0-A-R1-R0-A-R0-R0-C1-A". Result must be "Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!"', (cb) => {
        const argv = ['-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A'];
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);
        child.stdout.on('data', (data) => {
            const result = data.toString().trim();
            expect(result).toBe('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!');
        });

        child.stdin.end(testString);

        child.on('exit', (code) => {
            expect(code).toBe(0);
            cb();
        })
    });


    test('"A-A-A-R1-R0-R0-R0-C1-C1-A". Result must be "Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!"', (cb) => {
        const argv = ['-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A'];
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);
        child.stdout.on('data', (data) => {
            const result = data.toString().trim();
            expect(result).toBe('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!');
        });

        child.stdin.end(testString);

        child.on('exit', (code) => {
            expect(code).toBe(0);
            cb();
        })

    });

    test('"C1-R1-C0-C0-A-R0-R1-R1-A-C1". Result must be ""', (cb) => {
        const argv = ['-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1'];
        const child = spawn('node', ['my_ciphering_cli.js', ...argv]);
        child.stdout.on('data', (data) => {
            const result = data.toString().trim();
            expect(result).toBe('This is secret. Message about "_" symbol!');
        });
        child.stdin.end(testString);

        child.on('exit', (code) => {
            expect(code).toBe(0);
            cb();
        })
    });
});


