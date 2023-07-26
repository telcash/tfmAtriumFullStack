export declare class HashService {
    hashData(data: string): Promise<string>;
    isMatch(data: string, hash: string): Promise<boolean>;
}
