import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface JWTUser extends User {
  jwt?: JWT | string;
}

export interface JWTSession extends Session {
  user?: JWTUser;
}
