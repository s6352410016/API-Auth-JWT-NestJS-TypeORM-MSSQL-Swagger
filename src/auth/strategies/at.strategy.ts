import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "src/types/token-payload.type";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy , "jwt-access") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: TokenPayload){
        return {
            username: payload.username,
            email: payload.email
        }
    }
}