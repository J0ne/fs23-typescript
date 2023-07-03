
// type can be anything, this checks if it is not a number
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

export const parseArguments = (args: Array<string>): Array<number> => {
    if (args.slice(1).every(isNotNumber)) {
        throw new Error('Provided values were not numbers!');
    }
    return args.slice(2).map(arg => Number(arg));
    };
