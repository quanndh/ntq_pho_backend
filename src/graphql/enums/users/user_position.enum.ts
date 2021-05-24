import { registerEnumType } from "@nestjs/graphql";

export enum UserPositionEnum {
  DEV = "DEV",
  COMTOR = "COMTOR",
  CEO = "CEO",
  BA = "BA",
  PM = "PM",
  TEAM_LEAD = "TEAM_LEAD",
  DM = "DM",
}

registerEnumType(UserPositionEnum, {
  name: "UserPositionEnum",
});
