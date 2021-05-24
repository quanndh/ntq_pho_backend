import { registerEnumType } from "@nestjs/graphql";

export enum UserDepartmentEnum {
  OS8 = "OS8",
  OS1 = "OS1",
  OS3 = "OS3",
  OS10 = "OS10",
  IC = "IC",
  BOM = "BOM",
  RECO = "RECO",
  EZD = "EZD",
  TWOB = "TWOB",
}

registerEnumType(UserDepartmentEnum, {
  name: "UserDepartmentEnum",
});
