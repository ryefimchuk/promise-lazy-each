export default function promiseLazyEach<T>(values: T[], promiseFactory: (value: T, index?: number) => Promise<any>): Promise<void> {

    if (values.length === 0) {

        return Promise.resolve();
    }

    return new Promise<void>((resolve: () => void, reject: (error: any) => void) => {

        const nextIteration: (index?: number) => void = (index: number = 0): void => {

            if (index === values.length) {

                resolve();
            } else {

                promiseFactory(values[index], index).then((result: any): void => {

                    if (typeof result === 'boolean' && !result) {

                        resolve();
                        return;
                    }

                    nextIteration(index + 1);
                }, (error: any): void => {

                    reject(error);
                });
            }
        };

        nextIteration();
    });
}