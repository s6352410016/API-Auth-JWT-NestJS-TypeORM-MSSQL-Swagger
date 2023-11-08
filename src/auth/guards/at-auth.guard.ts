import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AtAuthGuard extends AuthGuard("jwt-access"){}