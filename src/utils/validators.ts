export const required = (value: string) => !value ? 'Field is required' : void 0;

export const maxNumber = (number: number) => (value: string) => number <= +value ? `Max number is ${number}` : void 0;