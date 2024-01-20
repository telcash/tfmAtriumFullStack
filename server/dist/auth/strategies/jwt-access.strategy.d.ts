import { Strategy } from "passport-jwt";
declare const JwtAccessStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
