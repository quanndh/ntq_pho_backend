import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "../services/auth.service";
import { AuthCookie, CurrentUser } from "src/decorators/common.decorator";
import { User } from "src/modules/users/entities/users.entity";
import { AuthConnection } from "../entities/auth_connection.entity";
import jwtDecode from "jwt-decode";
import moment from "moment";
import type { JWTDecodeValue } from "../auth.interface";
import { GraphQLContext } from "src/graphql/app.graphql-context";
import { LoginSNSInput } from "src/modules/users/dto/new_user.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthConnection)
  async loginWithSNS(
    @Args("input") input: LoginSNSInput,
    @Context() ctx: GraphQLContext
  ) {
    const data = await this.authService.loginWithSNS(input);
    if (data.accessToken && data.refreshToken) {
      ctx.res.cookie("token", data.accessToken, {
        expires: moment(
          jwtDecode<JWTDecodeValue>(data.accessToken).exp * 1000
        ).toDate(),
        sameSite: false,
        httpOnly: true,
      });
      ctx.res.cookie("refreshtoken", data.refreshToken, {
        expires: moment(
          jwtDecode<JWTDecodeValue>(data.refreshToken).exp * 1000
        ).toDate(),
        sameSite: false,
        httpOnly: true,
      });
    }
    return data;
  }

  @AuthCookie()
  @Mutation(() => Boolean, { name: "logout" })
  async logout(@CurrentUser() user: User, @Context() ctx: GraphQLContext) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const token: string = ctx.req.cookies.token;
      const userId = user.id;
      ctx.res.clearCookie("token");
      ctx.res.clearCookie("refreshToken");
      await this.authService.deleteToken(token, userId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
