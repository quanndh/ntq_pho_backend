import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/modules/users/services/users.service";
import type { Payload, JWTDecodeValue } from "../auth.interface";
import { AuthRepository } from "../repositories/auth.repository";
import { ApolloError } from "apollo-server";
import jwtDecode from "jwt-decode";
import { AuthTokenEntity } from "../entities/auth.entity";
import { DeepPartial, DeleteResult, FindConditions } from "typeorm";
import { LoginSNSInput } from "src/modules/users/dto/new_user.input";
import { google } from "googleapis";
const oauth2 = google.oauth2("v2");

type JwtGenerateOption = {
  audience?: string | string[];
  issuer?: string;
  jwtid?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository
  ) {}

  findOne = async (conditions?: FindConditions<AuthTokenEntity>) => {
    return await this.authRepository.findOne(conditions);
  };

  initAccessToken = (data: {
    payload: Payload;
    options?: JwtGenerateOption;
  }) => {
    const { payload, options } = data;
    return {
      accessToken: this.jwtService.sign(
        { ...payload },
        {
          ...options,
          expiresIn: `30 days`,
        }
      ),
      refreshToken: this.jwtService.sign(
        { ...payload },
        {
          ...options,
          expiresIn: `35 days`,
        }
      ),
    };
  };

  initChangePassToken = (payload) => {
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: `10 m`,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: `10 m`,
      }),
    };
  };

  saveAuthToken = async (userInfo: Payload, options?: JwtGenerateOption) => {
    const { accessToken, refreshToken } = this.initAccessToken({
      payload: userInfo,
      options,
    });

    return await this.createToken({
      userId: userInfo?.id,
      accessToken,
      refreshToken,
    });
  };

  createToken = async (data: DeepPartial<AuthTokenEntity>) => {
    const authToken = this.authRepository.create({ ...data });
    const newAuthToken = await this.authRepository.save(authToken);
    return await this.authRepository.findOne(newAuthToken.id);
  };

  refreshToken = async (refreshToken: string) => {
    try {
      const currentPayload: Payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          ignoreExpiration: false,
        }
      );
      const token = await this.authRepository.findOne({
        where: { refreshToken },
      });
      if (!token) {
        throw new ApolloError("invalid_token");
      }
      const decoded = jwtDecode<JWTDecodeValue>(token.accessToken);
      const decodedRefreshToken = jwtDecode<JWTDecodeValue>(token.refreshToken);
      const payload: Payload = currentPayload;
      const refreshPayload: Payload = currentPayload;
      token.accessToken = this.jwtService.sign(payload, {
        expiresIn: `30 days`,
        issuer: decoded.iss,
        audience: decoded.aud,
      });
      token.refreshToken = this.jwtService.sign(refreshPayload, {
        expiresIn: `35 days`,
        issuer: decodedRefreshToken.iss,
        audience: decodedRefreshToken.aud,
      });
      const newToken = await this.updateToken(token);
      const user = this.usersService.findById(currentPayload.id);
      if (newToken) {
        return {
          user,
          accessToken: newToken.accessToken,
          refreshToken: newToken.refreshToken,
        };
      }
    } catch (error) {
      throw new ApolloError("invalid_token");
    }
  };

  updateToken = async (data: Partial<AuthTokenEntity>) => {
    if (data.id) {
      delete data.updatedAt;
      await this.authRepository.update(data.id, data);
      return await this.authRepository.findOne(data.id);
    }
  };

  getSocialUser = async (accessToken: string) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    try {
      const auth = new google.auth.GoogleAuth({
        scopes: [
          "openid",
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.gender",
        ],
      });

      google.options({ auth: oauth2Client });

      // Do the magic
      const res = await oauth2.userinfo.get({});

      const { data } = res;

      if (!data.id || !data.email) {
        throw new ApolloError("login_google_required_email", "login_social");
      }
      return {
        id: data.id,
        email: data?.email,
        name: data?.name,
        first_name: data?.family_name,
        last_name: data?.given_name,
        avatar: data?.picture,
      };
    } catch (err) {
      throw new ApolloError("Đăng nhập thất bại", "login_social");
    }
  };

  loginWithSNS = async (input: LoginSNSInput) => {
    let user = await this.getSocialUser(input.token);
    if (!user) throw new Error("Tài khoản không hợp lệ");
    let findUser = await this.usersService.findWhere({
      where: {
        googleId: user.id,
      },
    });

    const [nickname, domain] = user.email.split("@");

    if (domain !== "ntq-solution.com.vn")
      throw new Error("Vui lòng đăng nhập bằng email NTQ");

    if (!findUser) {
      findUser = await this.usersService.create({
        lastName: user.last_name ?? "",
        firstName: user.first_name ?? "",
        nickname,
        avatar: user.avatar ?? "",
        googleId: user.id,
        fullName: user.first_name + " " + user.last_name,
        isNew: true,
      });
    }

    if (!findUser.department || !findUser.position) {
      findUser.isNew = true;
    }

    try {
      const authToken = await this.saveAuthToken(findUser, {
        issuer: "snappost",
        audience: ["app"],
      });
      if (!authToken) {
        throw new ApolloError("Error");
      }
      return {
        user: findUser,
        accessToken: authToken?.accessToken,
        refreshToken: authToken?.refreshToken,
      };
    } catch (err) {
      throw new ApolloError(err.message);
    }
  };

  deleteToken = (token: string, userId: number): Promise<DeleteResult> => {
    return this.authRepository.delete({ accessToken: token, userId });
  };
}
